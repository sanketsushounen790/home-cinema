"use client";

import fetchMovieReleaseDates from "@/services/MovieDetail/fetchMovieReleaseDates";
import formatShortDate from "@/utils/formatShortDate";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReleaseDatesModal from "./ReleaseDatesModal";
import releaseDatesType from "@/utils/releaseDatesType";
import countryRegions from "@/utils/countryRegions";
import countryMovieCertificates from "@/utils/countryMovieCertificates";
import { Info } from "lucide-react";

interface MovieReleaseDatesProps {
  movieId: string | number;
}

const MovieReleaseDates = ({ movieId }: MovieReleaseDatesProps) => {
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [currentRegionISOCode, setCurrentRegionISOCode] = useState("US");
  const [selected, setSelected] = useState<CountryRegion>(countryRegions["US"]);
  const [selectedCountryCertificate, setSelectedCountryCertificate] = useState(
    countryMovieCertificates["US"]
  );

  const handleSelect = (regionCode: string) => {
    setCurrentRegionISOCode(regionCode);
    setSelected(countryRegions[regionCode]);
    if (countryMovieCertificates[regionCode] === undefined) {
      setSelectedCountryCertificate(countryMovieCertificates["US"]);
    } else {
      setSelectedCountryCertificate(countryMovieCertificates[regionCode]);
    }

    setIsDropdownOpen(false);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["getMovieReleaseDates", movieId],
    queryFn: () => fetchMovieReleaseDates(movieId),
    staleTime: Infinity,
  });

  console.log(data);

  const resultsInSpecifyRegion: MovieReleaseDate | undefined =
    data?.results.find((result) => result.iso_3166_1 === currentRegionISOCode);

  console.log("releaseDateinSpecifyRegion", resultsInSpecifyRegion);

  function findPrimaryRelease(
    resultsInSpecifyRegion: MovieReleaseDate | undefined
  ) {
    // 1. **Ưu tiên 1: Tìm đối tượng có Type = 3 (Theatrical)**
    const theatricalRelease = resultsInSpecifyRegion?.release_dates.find(
      (release) => release.type === 3
    );

    if (theatricalRelease) {
      return theatricalRelease; // Trả về ngay đối tượng Type 3 đầu tiên tìm thấy
    }

    // ---
    // 2. **Ưu tiên 2: Nếu không có Type 3, tìm đối tượng có Certification không trống**
    const certifiedRelease = resultsInSpecifyRegion?.release_dates.find(
      (release) => release.certification
    );

    if (certifiedRelease) {
      return certifiedRelease; // Trả về đối tượng có Certificate đầu tiên tìm thấy
    }

    // 3. **Ưu tiên 3: Nếu không thỏa mãn cả hai điều kiện trên, trả về đối tượng đầu tiên của mảng**
    // Dùng mảng rỗng [] để đảm bảo an toàn nếu releaseArray không có phần tử nào
    return resultsInSpecifyRegion?.release_dates[0];
  }

  const primaryRelease = findPrimaryRelease(resultsInSpecifyRegion);

  console.log(primaryRelease);

  return (
    <div className="flex justify-start items-center gap-2">
      {primaryRelease === undefined || primaryRelease.certification === "" ? (
        <></>
      ) : (
        <div className="border-[1px] p-[3px] text-[15px]">
          {primaryRelease?.certification}
        </div>
      )}

      <div className="text-[15px]">
        {formatShortDate(primaryRelease?.release_date as string, "US")}
      </div>

      <img
        src={countryRegions[currentRegionISOCode]?.flag}
        alt={countryRegions[currentRegionISOCode]?.name}
        className="w-5 h-4 rounded border"
      />

      <div className="">
        <Info
          size={20}
          className="cursor-pointer hover:scale-110"
          onClick={() => setOpen(true)}
        />

        <ReleaseDatesModal open={open} onClose={() => setOpen(false)}>
          <div className="overflow-x-auto w-[500px] h-[500px] bg-blue-200">
            <div className="flex items-center justify-end mb-2">
              <button
                onClick={() => setOpen(false)}
                className=" bg-red-500 text-white rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="flex items-start justify-start gap-2">
              <h2 className="text-xl font-semibold mb-4">
                Released In {data?.results.length} regions:
              </h2>

              <div className="relative w-auto min-w-42 text-sm ">
                {/* BOX hiển thị quốc gia đã chọn */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between border rounded-lg px-3 py-2 bg-white cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={selected?.flag}
                      alt={selected?.name}
                      className="w-5 h-4 rounded border"
                    />
                    <span>{selected?.name}</span>
                  </div>

                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* DROPDOWN */}
                {isDropdownOpen && (
                  <ul className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg z-20">
                    {data?.results.map((region, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelect(region.iso_3166_1)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <img
                          src={countryRegions[region.iso_3166_1]?.flag}
                          alt={countryRegions[region.iso_3166_1]?.name}
                          className="w-5 h-4 rounded border"
                        />
                        <span>{countryRegions[region.iso_3166_1]?.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Certificate</th>
                    <th className="px-4 py-2 border">Release Date</th>
                    <th className="px-4 py-2 border">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsInSpecifyRegion?.release_dates.map(
                    (releaseDates, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">
                          {releaseDatesType.get(releaseDates.type)}
                        </td>
                        <td className="px-4 py-2 border">
                          {releaseDates.certification === ""
                            ? "none"
                            : releaseDates.certification}
                        </td>
                        <td className="px-4 py-2 border">
                          {formatShortDate(
                            releaseDates.release_date as string,
                            "US"
                          )}
                        </td>
                        <td className="px-4 py-2 border">
                          {releaseDates.note === ""
                            ? "none"
                            : releaseDates.note}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="w-full flex flex-wrap flex-col items-start justify-center mt-2">
              {selectedCountryCertificate.map((certificate, index) => (
                <div
                  key={index}
                  className="w-full flex flex-wrap items-center justify-start gap-1 mb-2 bg-red-200"
                >
                  <p className="border-[1px] p-[3px] text-[15px]">
                    {certificate.certification}
                  </p>
                  <p>{certificate.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </ReleaseDatesModal>
      </div>
    </div>
  );
};

export default MovieReleaseDates;
