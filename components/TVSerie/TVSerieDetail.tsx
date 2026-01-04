"use client";

import roundUpToDecimal from "@/utils/roundUpToDecimal";

import Link from "next/link";

import getLanguageName from "@/utils/getLanguageName";

import TVSerieCastCard from "./TVSerieCastCard";

import TVSerieMedia from "./TVSerieMedia";
import TVSerieKeywords from "./TVSerieKeywords";
import { TVSerieRecommendations } from "./TVSerieRecommendations";
import { TVSerieSimilars } from "./TVSerieSimilars";
import TVSerieContentRatings from "./TVSerieContentRatings";

import TVSerieSeason from "./TVSerieSeason";
import countryRegions from "@/utils/countryRegions";
import { EpisodeItem } from "./EpisodeItem";
import { LastEpisodeToAirItem } from "./LastEpisodeToAirItem";
import { formatDate } from "@/utils/formatDate";
import convertMinutesToHoursAndMinutes from "@/utils/convertMinutesToHoursAndMinutes";
import { useEffect, useState } from "react";
import TVCreditsModal from "./TVCreditsModal";

import logoPlaceholder from "../../assets/logo_placeholder.jpg";
import Image from "next/image";
import TVSerieCreditsImportRoles from "./TVSerieCreditsImportRoles";
import { useThemeStore } from "@/store/themeStore";
import { Info, Play, X } from "lucide-react";
import countryTVSerieCertificates from "@/utils/countryTVSerieCertificates";
import fetchTVSerieContentRatings from "@/services/TVSerieList/fetchTVSerieContentRatings";
import { useQuery } from "@tanstack/react-query";
import ReleaseDatesModal from "../MovieDetail/ReleaseDatesModal";
import useTVSerieDetail from "./hook/useTVSerieDetail";
import cardPlaceholder from "../../assets/card_placeholder.jpg";

// import MovieReleaseDates from "./MovieReleaseDates";

interface TVSerieDetailProps {
  tvId: string;
  //result: TVSerieDetailResult;
  credits: TVSerieAggregateCreditsResult;
}

const TVSerieDetail = ({ tvId, credits }: TVSerieDetailProps) => {
  const { data: result, isLoading: isTVSerieDetailLoading } =
    useTVSerieDetail(tvId);

  const { theme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const [openContentRatings, setOpenContentRatings] = useState(false);
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
    queryKey: ["getTVSerieContentRatings", result?.id],
    queryFn: () => fetchTVSerieContentRatings(result!.id),
    staleTime: Infinity,
    enabled: !isTVSerieDetailLoading && !!result,
  });

  console.log("resultTVDetail", result);
  //console.log("TVSerieContentRatings", data);

  const resultsInSpecifyRegion: TVSerieContentRating | undefined =
    data?.results.find((result) => result.iso_3166_1 === currentRegionISOCode);

  //console.log("releaseDateinSpecifyRegion", resultsInSpecifyRegion);

  if (isTVSerieDetailLoading) {
    <div className="flex justify-center items-center mt-20">Loading...</div>;
  } else if (!result) {
    <div className="flex justify-center items-center mt-20">No Data</div>;
  } else {
    return (
      <div className="w-full h-auto flex flex-col justify-start items-center mb-10">
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
                    alt={result.name}
                    width={300}
                    height={400}
                    className="rounded-lg shadow-xl"
                  />
                ) : (
                  <>
                    <Image
                      src={cardPlaceholder}
                      alt={result?.name}
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
                  {result.name} ({result.first_air_date.slice(0, 4)})
                </div>
                <div className="w-full flex flex-wrap justify-start items-center gap-2 mt-2">
                  <div className="flex justify-start items-center gap-2">
                    <div className="flex justify-start items-center gap-2">
                      <div className="border-[1px] px-[5px] text-[15px]">
                        {resultsInSpecifyRegion?.rating}
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
                          onClick={() => setOpenContentRatings(true)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>•</div>
                  <div className="w-auto flex flex-wrap justify-start items-center gap-2">
                    {result.genres.map((genre, index) => (
                      <Link
                        key={index}
                        href={`/genre/tv/${genre.id}-${genre.name}`}
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

                  <a href="#season-section">
                    <button
                      className={`btn font-bold shadow-none ${
                        theme === "light"
                          ? "bg-blue-400/30 hover:bg-blue-400/15 border-blue-500 text-blue-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      } `}
                    >
                      <Play />
                      Xem Ngay
                    </button>
                  </a>
                </div>

                <div className="text-[17px] italic">{result.tagline}</div>
                <div className="font-bold text-[20px]">Overview</div>
                <p>{result.overview}</p>

                <div className="w-full flex flex-wrap justify-start items-center gap-4">
                  {result?.created_by.length !== 0 &&
                    result?.created_by?.map((crew, index) => (
                      <div
                        key={index}
                        className="w-[200px] flex flex-col justify-center items-start"
                      >
                        <p className="text-[16px] font-bold">Creator</p>

                        <div className="w-full flex flex-wrap">
                          <Link
                            href={`/person/${crew.id}`}
                            className="hover:underline"
                          >
                            <p className="text-[16px]">{crew.name}</p>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReleaseDatesModal
          open={openContentRatings}
          onClose={() => setOpenContentRatings(false)}
        >
          <div className="overflow-x-auto w-[550px] h-[470px] p-2">
            <div className="flex items-center justify-end mb-1">
              <button
                onClick={() => setOpenContentRatings(false)}
                className="cursor-pointer bg-base-100 hover:bg-base-300"
              >
                <X size={24} />
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

            {/* TV Serie Content Rating Tag */}
            <div className="flex justify-start items-center gap-2 mt-2 pb-3 border-b-1">
              <p>This Series Content Rating:</p>

              <p className="border-[1px] px-[5px] text-[15px]">
                {resultsInSpecifyRegion?.rating}
              </p>
            </div>

            <div className="w-full flex flex-wrap flex-col items-start justify-center mt-2">
              {selectedCountryCertificate.map((certificate, index) => (
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
              ))}
            </div>
          </div>
        </ReleaseDatesModal>

        <br></br>

        <div className="w-full h-auto flex flex-col justify-start items-center">
          <div className="w-[90%] font-bold text-[22px]">Top Billed Cast</div>
          <div className="w-[90%] h-auto flex flex-col justify-start items-center">
            <div className="w-full h-auto flex flex-col justify-start items-center">
              <div className="w-full h-full px-1 py-5 flex justify-start items-start gap-7 overflow-x-scroll touch-pan-x scroll-smooth">
                {credits?.cast.slice(0, 12).map((person, index) => (
                  <div
                    key={index}
                    className="w-[150px] min-h-[200px] h-auto flex-shrink-0 rounded-lg bg-base-300"
                  >
                    <TVSerieCastCard cast={person} />
                  </div>
                ))}

                <div className="w-[155px] h-[300px] flex-shrink-0 flex justify-center items-center bg-base-300 shadow-lg rounded-lg">
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

            <TVCreditsModal
              open={open}
              onClose={() => setOpen(false)}
              cast={credits.cast}
              crew={credits.crew}
            />
          </div>

          <br></br>

          <div className="w-[90%] font-bold text-[22px]">Infomation</div>
          <div className="w-[90%] flex justify-start items-start gap-6 mt-3">
            {/* Left */}
            <div className="w-[40%] rounded-xl bg-base-300 p-4 shadow-sm backdrop-blur">
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
                  <p className="font-bold">Original Name:</p>
                  <p>{result?.original_name}</p>
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

            {/* Right */}
            <div className="w-[55%] rounded-xl bg-base-300 p-4 shadow-sm backdrop-blur">
              <div className="flex flex-col flex-wrap items-start gap-4">
                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">Episodes:</p>
                  <p>{result.number_of_episodes}</p>
                </div>

                {result.episode_run_time.length === 0 ? (
                  <></>
                ) : (
                  <div className="flex justify-start items-start gap-2">
                    <p className="font-bold">Average Episode Run Time:</p>
                    <p>
                      {result.episode_run_time[0] > 60
                        ? convertMinutesToHoursAndMinutes(
                            result.episode_run_time[0]
                          )
                        : `${result.episode_run_time[0]}m`}
                    </p>
                  </div>
                )}

                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">First Air Date:</p>
                  <p>{formatDate(result.first_air_date)}</p>
                </div>

                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">Last Air Date:</p>
                  <p>{formatDate(result.last_air_date)}</p>
                </div>

                <div className="flex justify-start items-start gap-2">
                  <p className="font-bold">Last Episode</p>
                </div>

                <div className="w-full flex justify-start items-center">
                  <LastEpisodeToAirItem ep={result.last_episode_to_air} />
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
                    href={`/company/${item.id}-${item.name}-tv/tv`}
                    className="hover:underline cursor-pointer"
                  >
                    <p>{item.name}</p>
                  </Link>

                  {item.origin_country !== "" ? (
                    <img
                      src={`https://flagcdn.com/w320/${item.origin_country.toLowerCase()}.png`}
                      alt={item.origin_country}
                      className="w-5 h-4 rounded border"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>

          <br></br>
          <div className="w-[90%] font-bold text-[20px] mb-2">
            Airing Networks
          </div>
          <div className="w-[90%] h-auto flex flex-wrap justify-start items-center gap-4 mb-1">
            {result.networks.map((item, index) => (
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
                    href={`/network/${item.id}-${item.name}-tv/tv`}
                    className="hover:underline cursor-pointer"
                  >
                    <p>{item.name}</p>
                  </Link>

                  {item.origin_country !== "" ? (
                    <img
                      src={`https://flagcdn.com/w320/${item.origin_country.toLowerCase()}.png`}
                      alt={item.origin_country}
                      className="w-5 h-4 rounded border"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>

          <br></br>
          <span id="season-section"></span>
          <TVSerieSeason result={result} />

          <br></br>
          <TVSerieMedia tvId={result.id} />

          <br></br>
          <div className="w-[90%] mb-1">
            <div className="w-[90%] font-bold text-[20px]">Keywords</div>
          </div>
          <TVSerieKeywords tvId={result.id} />

          <br></br>
          <TVSerieRecommendations tvId={result.id} tvName={result.name} />

          <br></br>
          <TVSerieSimilars tvId={result.id} tvName={result.name} />
        </div>
      </div>
    );
  }
};

export default TVSerieDetail;
