"use client";

import convertMinutesToHoursAndMinutes from "@/utils/convertMinutesToHoursAndMinutes";
import MovieCreditsImportantRoles from "./MovieCreditsImportantRoles";
import MovieCastCard from "./MovieCastCard";
import roundUpToDecimal from "@/utils/roundUpToDecimal";
import MovieMedia from "./MovieMedia";
import Link from "next/link";
import moneyFormatter from "@/utils/moneyFormatter";
import MovieKeywords from "./MovieKeywords";
import { MovieRecommendations } from "./MovieRecommendations";
import getLanguageName from "@/utils/getLanguageName";
import { MovieSimilars } from "./MovieSimilars";
import MovieReleaseDates from "./MovieReleaseDates";
import countryRegions from "@/utils/countryRegions";
import { useEffect, useRef, useState } from "react";
import MovieCreditsModal from "./MovieCreditsModal";
import Image from "next/image";
import logoPlaceholder from "../../assets/logo_placeholder.jpg";
import ReleaseDatesModal from "./ReleaseDatesModal";
import countryMovieCertificates from "@/utils/countryMovieCertificates";
import { useQuery } from "@tanstack/react-query";
import fetchMovieReleaseDates from "@/services/MovieDetail/fetchMovieReleaseDates";
import formatShortDate from "@/utils/formatShortDate";
import releaseDatesType from "@/utils/releaseDatesType";
import { Clapperboard, Info, Play, X } from "lucide-react";
import TrailerModal from "./TrailerModal";
import fetchMovieVideos from "@/services/MovieDetail/fetchMovieVideos";
import { useThemeStore } from "@/store/themeStore";
import useMovieDetail from "./hook/useMovieDetail";
import cardPlaceholder from "../../assets/card_placeholder.jpg";

interface MovieDetailProps {
  id: string;
}

function groupCrewById(crew: any[]) {
  const result: Record<number, any & { jobs: string[] }> = {};

  crew.forEach((person) => {
    if (!result[person.id]) {
      result[person.id] = {
        ...person,
        jobs: [person.job], // tạo mảng jobs đầu tiên
      };
    } else {
      // nếu đã tồn tại → push job vào mảng jobs
      result[person.id].jobs.push(person.job);
    }
  });

  // trả về dạng array
  return Object.values(result);
}

const MovieDetail = ({ id }: MovieDetailProps) => {
  const { data: result, isLoading: isResutlLoading } = useMovieDetail(id);

  const { theme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const [openTrailerModal, setOpenTrailerModal] = useState(false);
  const groupedCrew = groupCrewById(result?.credits.crew || []);

  const targetJobs = ["Director", "Screenplay", "Characters", "Story"];

  // Sử dụng Array.filter() để lọc ra các objects thỏa mãn điều kiện
  const filteredCrew = result?.credits?.crew.filter((member) =>
    targetJobs.includes(member.job)
  );

  const groupedCrewForImportantRoles = groupCrewById(filteredCrew || []);

  const [openReleaseDatesModal, setOpenReleaseDatesModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [currentRegionISOCode, setCurrentRegionISOCode] = useState("US");
  const [selected, setSelected] = useState<CountryRegion>(countryRegions["US"]);
  const [selectedCountryCertificate, setSelectedCountryCertificate] = useState(
    countryMovieCertificates["US"]
  );
  const [notfoundCertificatesFlag, setNotfoundCertificatesFlag] =
    useState<boolean>(false);

  const handleSelect = (regionCode: string) => {
    setCurrentRegionISOCode(regionCode);
    setSelected(countryRegions[regionCode]);
    if (countryMovieCertificates[regionCode] === undefined) {
      setNotfoundCertificatesFlag(true);
      setSelectedCountryCertificate(countryMovieCertificates["US"]);
    } else {
      setNotfoundCertificatesFlag(false);
      setSelectedCountryCertificate(countryMovieCertificates[regionCode]);
    }

    setIsDropdownOpen(false);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["getMovieReleaseDates", result?.id],
    queryFn: () => fetchMovieReleaseDates(result!.id),
    enabled: !isResutlLoading && !!result,
  });

  console.log("release dates", data);
  const {
    isLoading: isMovieVideoLoading,
    error: movieVideoError,
    data: movieVideoData,
  } = useQuery({
    queryKey: ["getMovieVideos", result?.id],
    queryFn: () => fetchMovieVideos(result!.id),
    enabled: !isResutlLoading && !!result,
  });

  console.log("movieVideoData", movieVideoData);

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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: any) {
      // nếu click KHÔNG nằm trong phần tử có class "dropdown-area"
      if (!e.target.closest(".dropdown-area")) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // console.log("movieDetail", result);
  // console.log(result?.origin_country);

  if (isResutlLoading) {
    return (
      <div className="flex justify-center items-center mt-20">Loading...</div>
    );
  } else if (!result) {
    return (
      <div className="flex justify-center items-center mt-20">No Data</div>
    );
  } else {
    return (
      <div className="w-full h-auto flex flex-col justify-start items-center mb-10">
        {isMovieVideoLoading ? (
          <></>
        ) : (
          <TrailerModal
            isOpen={openTrailerModal}
            onClose={() => setOpenTrailerModal(false)}
            videos={
              movieVideoData?.results.filter(
                (v) => v.type === "Trailer" && v.site === "YouTube"
              ) ?? []
            }
          />
        )}
        <div className="relative w-full min-h-[550px] h-auto overflow-hidden">
          {/* Backdrop image */}
          {result?.backdrop_path && (
            <img
              src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${result.backdrop_path}`}
              className="absolute inset-0 w-full h-full object-cover"
              alt="backdrop"
            />
          )}

          {/* Gradient*/}
          <div
            className="absolute inset-0 bg-gradient-to-r
             from-transparent
             via-neutral-900/10
             to-neutral-900/30"
          ></div>

          {/* Content */}
          <div className="relative z-10 flex items-start gap-8 p-10">
            <div className="w-full h-full flex justify-center items-start gap-6">
              <div className="w-[300px] h-[400px]">
                {result?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w1280/${result.poster_path}`}
                    alt={result.title}
                    width={300}
                    height={400}
                    className="rounded-lg shadow-xl border-1"
                  />
                ) : (
                  <>
                    <Image
                      src={cardPlaceholder}
                      alt={result.title}
                      className="w-[300px] h-[400px]"
                    />
                  </>
                )}
              </div>

              <div
                className={`w-[70%] h-full flex flex-col justify-start items-start backdrop-blur-sm border ${
                  theme === "light"
                    ? "bg-white/35 border-white/10"
                    : "bg-black/30 border-white/10"
                }  rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-4`}
              >
                <div className="font-bold text-[25px]">
                  {result.title} ({result.release_date.slice(0, 4)})
                </div>
                <div className="w-full flex flex-wrap justify-start items-center gap-2 mt-2">
                  <div className="flex justify-start items-center gap-2">
                    {primaryRelease === undefined ||
                    primaryRelease.certification === "" ? (
                      <></>
                    ) : (
                      <div className="border-[1px] px-[5px] text-[15px]">
                        {primaryRelease?.certification}
                      </div>
                    )}
                    <div className="text-[15px]">
                      {formatShortDate(
                        primaryRelease?.release_date as string,
                        result.origin_country[0]
                      )}
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
                        onClick={() => setOpenReleaseDatesModal(true)}
                      />
                    </div>
                  </div>

                  <div>•</div>
                  <div className="w-auto flex flex-wrap justify-start items-center gap-2">
                    {result.genres.map((genre, index) => (
                      <Link
                        key={index}
                        href={`/genre/movie/${genre.id}-${genre.name}`}
                      >
                        <div
                          className="inline-block px-3 py-1 text-sm font-medium rounded-full border border-base-content
                     bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                        >
                          {genre.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div>•</div>
                  <div className="">
                    {convertMinutesToHoursAndMinutes(result.runtime)}
                  </div>
                </div>

                <div className="w-full h-auto my-3 flex flex-wrap justify-start items-center gap-4">
                  <div
                    className={` w-[45px] h-[45px] rounded-full
                     flex items-center justify-center font-semibold text-sm
                     shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                     border-2 bg-black ${
                       result.vote_average >= 7
                         ? "text-green-400 border-green-400"
                         : result.vote_average >= 5
                         ? "text-yellow-400 border-yellow"
                         : "text-red-400 border-red"
                     } `}
                    aria-label={`rating ${result.vote_average}`}
                  >
                    {roundUpToDecimal(result.vote_average, 1)}
                  </div>
                  <button
                    className={`btn font-bold shadow-none  ${
                      theme === "light"
                        ? "bg-orange-400/30 hover:bg-orange-400/15 border-orange-500 text-orange-500"
                        : "bg-orange-400 hover:bg-orange-500"
                    }`}
                    onClick={() => setOpenTrailerModal(true)}
                  >
                    <Clapperboard />
                    Trailer
                  </button>
                  <Link href={`/movie/${result.id}/watch`}>
                    <button
                      className={`btn font-bold shadow-none ${
                        theme === "light"
                          ? "bg-blue-400/30 hover:bg-blue-400/15 border-blue-500 text-blue-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      } `}
                    >
                      <Play />
                      Xem Phim
                    </button>
                  </Link>
                </div>

                <div className="text-[17px] italic">{result.tagline}</div>
                <div className="font-bold text-[20px]">Overview</div>
                <p>{result.overview}</p>

                <div className="mt-2">
                  <MovieCreditsImportantRoles
                    crew={groupedCrewForImportantRoles}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReleaseDatesModal
          open={openReleaseDatesModal}
          onClose={() => setOpenReleaseDatesModal(false)}
        >
          <div className="overflow-x-auto w-[550px] h-[500px] p-4">
            <div className="flex items-center justify-end mb-2">
              <button
                onClick={() => setOpenReleaseDatesModal(false)}
                className="cursor-pointer bg-base-100 hover:bg-base-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex items-start justify-start gap-2 mb-2">
              <h2 className="text-xl font-semibold mb-4">
                Released In {data?.results.length} regions:
              </h2>

              <div className="relative w-auto min-w-42 text-sm dropdown-area">
                {/* BOX hiển thị quốc gia đã chọn */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between border rounded-lg px-3 py-2 bg-base-100 cursor-pointer"
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
                  <ul className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-base-100 border rounded-lg shadow-lg z-20">
                    {data?.results.map((region, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelect(region.iso_3166_1)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer"
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
              <table className="w-full border bg-base-100 text-sm text-center">
                <thead className="bg-base-300">
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

            <div className="w-full flex flex-wrap flex-col items-start justify-center mt-4">
              {notfoundCertificatesFlag ? (
                <div>
                  Chưa có Certificates nào cho phim này ở Quốc gia này. Bạn có
                  thể giúp cập nhật dữ liệu mới tại trang chủ của TMDB
                </div>
              ) : (
                selectedCountryCertificate.map((certificate, index) => (
                  <div
                    key={index}
                    className="w-full flex items-start justify-start gap-1 mb-4"
                  >
                    <p>
                      <span className="border-[1px] px-[5px] text-[15px]">
                        {certificate.certification}
                      </span>

                      <span> : {certificate.meaning}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </ReleaseDatesModal>

        <br></br>

        <div className="w-full h-auto flex flex-col justify-start items-center">
          <div className="w-[90%] font-bold text-[22px]">Top Billed Cast</div>
          <div className="w-[90%] h-auto flex flex-col justify-start items-center">
            <div className="w-full h-auto flex flex-col justify-start items-center">
              <div className="w-full h-full px-1 py-5 flex justify-start items-start gap-7 overflow-x-scroll touch-pan-x scroll-smooth">
                {result?.credits?.cast.slice(0, 10).map((person, index) => (
                  <div
                    key={index}
                    className="w-[150px] min-h-[200px] h-auto flex-shrink-0 rounded-lg bg-base-300 shadow-lg"
                  >
                    <MovieCastCard cast={person} />
                  </div>
                ))}

                <div className="w-[155px] h-[300px] flex-shrink-0 flex justify-center items-center bg-base-300 shadow-lg">
                  <div className="w-full h-[50%] flex justify-center items-center font-bold">
                    <button
                      onClick={() => setOpen(true)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                    >
                      Xem thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[90%] font-bold text-[20px]">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
              onClick={() => setOpen(true)}
            >
              View All Cast & Crew
            </button>

            <MovieCreditsModal
              open={open}
              onClose={() => setOpen(false)}
              cast={result.credits.cast}
              crew={groupedCrew}
            />
          </div>

          <br></br>
          <div className="w-[90%] font-bold text-[22px]">Infomation</div>

          <div className="w-[90%] flex justify-start items-center mt-3">
            <div className="w-[50%] rounded-xl bg-base-300 p-4 shadow-sm backdrop-blur">
              <div className="flex flex-col flex-wrap items-start gap-4">
                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">Status:</p>
                  <p>{result.status}</p>
                </div>

                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">Original Language:</p>
                  <p>{getLanguageName(result.original_language)}</p>
                </div>

                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">Budget:</p>
                  <p>
                    {result?.budget === 0
                      ? "No Data"
                      : moneyFormatter.format(result.budget)}
                  </p>
                </div>

                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">Revenue:</p>
                  <p>
                    {result?.revenue === 0
                      ? "No Data"
                      : moneyFormatter.format(result.revenue)}
                  </p>
                </div>

                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">Original Title:</p>
                  <p>{result?.original_title}</p>
                </div>

                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">Origin Country:</p>
                  {result.origin_country.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center gap-2"
                    >
                      <p>{countryRegions[item].name}</p>
                      <img
                        src={countryRegions[item].flag}
                        alt={countryRegions[item].name}
                        className="w-5 h-4 rounded border"
                      />
                      {index + 1 < result.origin_country.length ? "/" : ""}
                    </div>
                  ))}
                </div>

                <div className="w-full flex flex-wrap justify-start items-center gap-2">
                  <p className="font-bold">Spoken Languages:</p>
                  {result.spoken_languages.map((language, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center"
                    >
                      <span>
                        {language.name ? (
                          <>
                            {language.english_name} ({language.name}){" "}
                            {index + 1 < result.spoken_languages.length
                              ? "/"
                              : ""}
                          </>
                        ) : (
                          <>
                            {language.english_name}
                            {index + 1 < result.spoken_languages.length
                              ? "/"
                              : ""}
                          </>
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="w-full flex flex-wrap justify-start items-center gap-2">
                  <p className="font-bold">Production Country:</p>
                  {result.production_countries.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center gap-2"
                    >
                      <p>{item.name}</p>
                      <img
                        src={countryRegions[item.iso_3166_1].flag}
                        alt={item.name}
                        className="w-5 h-4 rounded border"
                      />
                      {index + 1 < result.production_countries.length
                        ? "/"
                        : ""}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <br></br>
          <div className="w-[90%] font-bold text-[20px] mb-2">
            Production Companies
          </div>
          <div className="w-[90%] h-auto flex flex-wrap justify-start items-center gap-4 mb-1">
            {result.production_companies.map((item, index) => (
              <div
                key={index}
                className={`w-auto h-auto flex flex-col justify-start items-center gap-4 p-2 font-bold text-[20px] shadow-lg ${
                  theme === "light" ? "bg-base-300" : "bg-gray-400 text-black"
                } `}
              >
                {item.logo_path ? (
                  <img
                    src={`https://media.themoviedb.org/t/p/h60${item.logo_path}`}
                    alt={item.name}
                  />
                ) : (
                  <Image
                    src={logoPlaceholder}
                    alt={item.name}
                    className="w-[120px] h-[70px] bg-gray-300 mt-4"
                  />
                )}

                <div className="flex justify-center items-center gap-2">
                  <Link
                    href={`/company/${item.id}-${item.name}-movie/movie`}
                    className="hover:underline cursor-pointer"
                  >
                    <p>{item.name}</p>
                  </Link>

                  {item.origin_country && (
                    <img
                      src={`https://flagcdn.com/w320/${item.origin_country.toLowerCase()}.png`}
                      alt={item.origin_country}
                      className="w-5 h-4 rounded border"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <br></br>
          <MovieMedia movieId={result.id} />

          <br></br>
          <MovieKeywords movieId={result.id} />

          <br></br>
          <MovieRecommendations movieId={result.id} movieName={result.title} />

          <br></br>
          <MovieSimilars movieId={result.id} movieName={result.title} />
        </div>
      </div>
    );
  }
};

export default MovieDetail;
