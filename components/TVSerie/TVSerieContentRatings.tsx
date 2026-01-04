"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import countryRegions from "@/utils/countryRegions";
import countryTVSerieCertificates from "@/utils/countryTVSerieCertificates";
import ReleaseDatesModal from "../MovieDetail/ReleaseDatesModal";
import fetchTVSerieContentRatings from "@/services/TVSerieList/fetchTVSerieContentRatings";

interface TVSerieContentRatingsProps {
  tvId: string | number;
}

const TVSerieContentRatings = ({ tvId }: TVSerieContentRatingsProps) => {
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [currentRegionISOCode, setCurrentRegionISOCode] = useState("US");
  const [selected, setSelected] = useState<CountryRegion>(countryRegions["US"]);
  const [selectedCountryCertificate, setSelectedCountryCertificate] = useState(
    countryTVSerieCertificates["US"]
  );

  const handleSelect = (regionCode: string) => {
    setCurrentRegionISOCode(regionCode);
    setSelected(countryRegions[regionCode]);
    if (countryTVSerieCertificates[regionCode] === undefined) {
      setSelectedCountryCertificate(countryTVSerieCertificates["US"]);
    } else {
      setSelectedCountryCertificate(countryTVSerieCertificates[regionCode]);
    }

    setIsDropdownOpen(false);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["getTVSerieContentRatings", tvId],
    queryFn: () => fetchTVSerieContentRatings(tvId),
    staleTime: Infinity,
  });

  console.log(data);

  const resultsInSpecifyRegion: TVSerieContentRating | undefined =
    data?.results.find((result) => result.iso_3166_1 === currentRegionISOCode);

  console.log("releaseDateinSpecifyRegion", resultsInSpecifyRegion);

  return (
    <div className="flex justify-start items-center gap-2">
      <div className="border-[1px] p-[3px] text-[15px]">
        {resultsInSpecifyRegion?.rating}
      </div>

      <img
        src={countryRegions[currentRegionISOCode]?.flag}
        alt={countryRegions[currentRegionISOCode]?.name}
        className="w-5 h-4 rounded border"
      />

      <div className="bg-orange-200">
        <button
          onClick={() => setOpen(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white cursor-pointer shadow-md active:scale-95"
        >
          <span className="text-lg font-semibold leading-none">+</span>
        </button>

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
                Air In {data?.results.length} regions:
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

            {/* TV Serie Content Rating Tag */}
            <div className="flex justify-start items-center gap-2 mt-2 pb-2 border-b-1">
              <p>CONTENT RATING:</p>

              <p className="border-[1px] p-[3px] text-[15px]">
                {resultsInSpecifyRegion?.rating}
              </p>
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

export default TVSerieContentRatings;
