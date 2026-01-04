"use client";

import { useEffect, useRef, useState } from "react";
import LoadingCard from "../Shared_Components/LoadingCard";
import { useDiscoverMovieSearch } from "../Movie/hook/useDiscoverMovieSearch";
import { i18nTVGenresArray, i18nTVGenres } from "@/utils/genresList";
import MovieCard from "../Movie/MovieCard";
import RunTimePicker from "./RunTimePicker";
import countryRegions from "@/utils/countryRegions";
import releaseDatesType from "@/utils/releaseDatesType";
import DateTimePicker from "./DateTimePicker";
import tmdbLanguages from "@/utils/tmdbLanguages";

import DoubleRanger from "./DoubleRanger";
import SingleRanger from "./SingleRanger";
import { useDiscoverTVSearch } from "../TVSerie/hook/useDiscoverTVSearch";
import TVSerieCard from "../TVSerie/TVSerieCard";
import { useLanguageStore } from "@/store/useLanguageStore";
import isCharsInString from "@/utils/isCharsInString";

const sortOptions: { name: string; param_pattern: DiscoverTVSortBy }[] = [
  {
    name: "Popularity Decending",
    param_pattern: "popularity.desc",
  },
  {
    name: "Popularity Ascending",
    param_pattern: "popularity.asc",
  },
  {
    name: "Revenue Decending",
    param_pattern: "revenue.desc",
  },
  {
    name: "Revenue Ascending",
    param_pattern: "revenue.asc",
  },

  {
    name: "Vote Average Ascending",
    param_pattern: "vote_average.asc",
  },
  {
    name: "Vote Average Decending",
    param_pattern: "vote_average.desc",
  },

  // {
  //   name: "Title Ascending",
  //   param_pattern: "title.asc",
  // },
  // {
  //   name: "Title Decending",
  //   param_pattern: "title.desc",
  // },
];

const TVSerieDiscover = () => {
  const { language } = useLanguageStore();

  const tvGenresArray =
    i18nTVGenresArray[language as keyof typeof i18nTVGenres] ||
    i18nTVGenresArray["en"];

  const replaceGenreNamInEnglish = new Map([
    [99, "Documentary"],
    [80, "Crime"],
    [35, "Comedy"],
    [10751, "Family"],
  ]);
  const [mainReleaseType, setMainReleaseType] = useState<"primary" | "all">(
    "primary"
  );

  const [openSort, setOpenSort] = useState(true);
  const [openFilters, setOpenFilters] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<CountryRegion>(countryRegions["US"]);
  const [searchInDropdown, setSearchInDropdown] = useState("");

  const [isDropdownOpenOriginCountry, setIsDropdownOpenOriginCountry] =
    useState(false);
  const [selectedOriginCountry, setSelectedOriginCountry] = useState<
    CountryRegion | string
  >("");
  const [searchInDropdownOriginCountry, setSearchInDropdownOriginCountry] =
    useState("");

  const [isDropdownOpenOriginalLanguage, setIsDropdownOpenOriginalLanguage] =
    useState(false);
  const [selectedOriginalLanguage, setSelectedOriginalLanguage] =
    useState<string>("");
  const [
    searchInDropdownOriginalLanguage,
    setSearchInDropdownOriginalLanguage,
  ] = useState("");

  const [genres, setGenres] = useState<string[]>([]);
  const [exclude_genres, setExcludeGenres] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [origin_country, setOriginCountry] = useState<string>("");
  const [original_language, setOriginalLanguage] = useState<string>("");

  const [include_adult, setIncludeAdult] = useState<boolean>(false);
  const [include_null_first_air_dates, setIncludeNullFirstAirDates] =
    useState<boolean>(false);

  const [vote_average_gte, setVoteAverageGte] = useState<number | null>(2);
  const [vote_average_lte, setVoteAverageLte] = useState<number | null>(8);
  const [vote_count_gte, setVoteCountGte] = useState<number | null>(500);
  const [vote_count_lte, setVoteCountLte] = useState<number | null>(null);

  const [first_air_date_gte, setFirstAirDateGte] = useState<string>("");
  const [first_air_date_lte, setFirstAirDateLte] = useState<string>("");

  const [release_date_gte, setReleaseDateGte] = useState<string>("");
  const [release_date_lte, setReleaseDateLte] = useState<string>("");
  const [release_type, setReleaseType] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);

  const [sort_by, setSortBy] = useState<DiscoverTVSortBy>("popularity.desc");

  const [region, setRegion] = useState<string>("");

  const [page, setPage] = useState<string>("1");

  const handleSelect = (regionCode: string) => {
    setRegion(regionCode);
    setSelected(countryRegions[regionCode]);
    setIsDropdownOpen(false);
  };

  const handleSelectOriginCountry = (regionCode: string) => {
    if (regionCode !== "") {
      setOriginCountry(regionCode);
      setSelectedOriginCountry(countryRegions[regionCode]);
      setIsDropdownOpenOriginCountry(false);
    } else {
      setOriginCountry("");
      setSelectedOriginCountry("");
      setIsDropdownOpenOriginCountry(false);
    }
  };

  const handleSelectOriginalLanguage = (languageItem: TMDBLanguage) => {
    if (languageItem.iso_639_1 !== "") {
      setOriginalLanguage(languageItem.iso_639_1);
      setSelectedOriginalLanguage(languageItem.english_name);
      setIsDropdownOpenOriginalLanguage(false);
    } else {
      setOriginalLanguage("");
      setSelectedOriginalLanguage("");
      setIsDropdownOpenOriginalLanguage(false);
    }
  };

  const toggleGenre = (genre: string) => {
    setGenres(
      (prev) =>
        prev.includes(genre)
          ? prev.filter((g) => g !== genre) // remove
          : [...prev, genre] // add
    );
  };

  const toggleExcludeGenre = (genre: string) => {
    setExcludeGenres(
      (prev) =>
        prev.includes(genre)
          ? prev.filter((g) => g !== genre) // remove
          : [...prev, genre] // add
    );
  };

  const toggleReleaseType = (value: string) => {
    setReleaseType((prev) => {
      // Nếu đã tồn tại thì bỏ ra
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      // Nếu chưa thì thêm vào
      return [...prev, value];
    });
  };

  const handleToogleBetweenMainReleaseDates = (type: string) => {
    if (type === "all") {
      setReleaseDateGte("");
      setReleaseDateLte("");
      setRegion("");
      setMainReleaseType("primary");
    } else {
      setFirstAirDateGte("");
      setFirstAirDateLte("");
      setMainReleaseType("all");
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    search,
    stableData,
  } = useDiscoverTVSearch({
    params: {
      genres,
      exclude_genres,
      keywords,
      origin_country,
      original_language,
      include_adult,
      include_null_first_air_dates,
      first_air_date_gte,
      first_air_date_lte,
      vote_average_gte,
      vote_average_lte,
      vote_count_gte,
      vote_count_lte,
      sort_by,
      language,
      page,
    },
  });

  console.log(selectedOriginalLanguage);

  // 3 refs
  const originCountryRef = useRef<HTMLDivElement | null>(null);
  const originalLanguageRef = useRef<HTMLDivElement | null>(null);
  const generalDropdownRef = useRef<HTMLDivElement | null>(null);

  // Click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      const clickedInside =
        originCountryRef.current?.contains(target) ||
        originalLanguageRef.current?.contains(target) ||
        generalDropdownRef.current?.contains(target);

      if (!clickedInside) {
        setIsDropdownOpenOriginCountry(false);
        setIsDropdownOpenOriginalLanguage(false);
        setIsDropdownOpen(false);

        setSearchInDropdown("");
        setSearchInDropdownOriginCountry("");
        setSearchInDropdownOriginalLanguage("");
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-start p-6">
      <div className="w-[300px]">
        <aside className="w-full max-w-[320px] h-auto space-y-4">
          {/* SEARCH BUTTON */}
          <button
            onClick={() => {
              search(); // trigger query khi click
            }}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg cursor-pointer"
          >
            Search
          </button>

          {/* SORT */}
          <div className="border rounded-lg bg-base-100 shadow-sm">
            <button
              onClick={() => setOpenSort(!openSort)}
              className={`w-full flex items-center justify-between font-medium p-2 ${
                openSort ? "border-b-[1px]" : ""
              }`}
            >
              Sort
              <svg
                className={`w-4 h-4 transition-transform cursor-pointer ${
                  openSort ? "rotate-180" : "rotate-0"
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

            <div
              className={`transition-all overflow-hidden ${
                openSort ? "max-h-40 py-3" : "max-h-0"
              }`}
            >
              <div className="px-4 space-y-2">
                <span className="block mb-2 text-[16px] font-bold">
                  Sort Results By
                </span>

                <select
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded cursor-pointer"
                >
                  {sortOptions.map((item, index) => (
                    <option key={index} value={item.param_pattern}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* FILTERS */}
          <div className="border rounded-lg bg-base-100 shadow-sm ">
            <button
              onClick={() => setOpenFilters(!openFilters)}
              className={`w-full flex items-center justify-between p-2 font-medium ${
                openFilters ? "border-b-[1px]" : ""
              } `}
            >
              Filters
              {/* <span className="text-lg">{openFilters ? "▾" : "▸"}</span> */}
              <svg
                className={`w-4 h-4 transition-transform cursor-pointer ${
                  openFilters ? "rotate-180" : "rotate-0"
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

            <div
              className={`transition-all overflow-hidden ${
                openFilters ? " h-auto py-3" : "max-h-0"
              }`}
            >
              <div className="px-4 space-y-4">
                {/* Release dates */}
                <div className="space-y-3">
                  <span className="block mb-2 text-[16px] font-bold">
                    Release Dates
                  </span>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="releaseType"
                        value="primary"
                        checked={mainReleaseType === "primary"}
                        onChange={() =>
                          handleToogleBetweenMainReleaseDates("all")
                        }
                        className="cursor-pointer"
                      />
                      <span className="text-[15px]">First Air Date</span>
                    </label>

                    {mainReleaseType === "primary" ? (
                      <>
                        {" "}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-10 text-sm">from</span>

                            <DateTimePicker
                              value={first_air_date_gte}
                              onChange={setFirstAirDateGte}
                              placeholder="From"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="w-10 text-sm">to</span>

                            <DateTimePicker
                              value={first_air_date_lte}
                              onChange={setFirstAirDateLte}
                              placeholder="To"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="releaseType"
                        value="all"
                        checked={mainReleaseType === "all"}
                        onChange={() =>
                          handleToogleBetweenMainReleaseDates("primary")
                        }
                        className="cursor-pointer"
                      />
                      <span className="text-[15px] text-gray-700">
                        All Release Dates
                      </span>
                    </label> */}
                  </div>
                </div>

                {/* Origin Country */}
                <div className="space-y-3">
                  <span className="block mb-2 text-[16px] font-bold">
                    Origin Country
                  </span>

                  <div
                    ref={originCountryRef}
                    className="relative w-auto min-w-42 text-sm"
                  >
                    {/* BOX hiển thị quốc gia đã chọn */}
                    <button
                      onClick={() =>
                        setIsDropdownOpenOriginCountry(
                          !isDropdownOpenOriginCountry
                        )
                      }
                      className="w-full flex items-center justify-between border rounded-lg px-3 py-2 bg-base-100 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {selectedOriginCountry === "" ? (
                          <div>Non Selected</div>
                        ) : (
                          <>
                            <img
                              src={
                                (selectedOriginCountry as CountryRegion)?.flag
                              }
                              alt={
                                (selectedOriginCountry as CountryRegion)?.name
                              }
                              className="w-5 h-4 rounded border"
                            />
                            <span>
                              {(selectedOriginCountry as CountryRegion)?.name}
                            </span>
                          </>
                        )}
                      </div>

                      <svg
                        className={`w-4 h-4 transition-transform ${
                          isDropdownOpenOriginCountry
                            ? "rotate-180"
                            : "rotate-0"
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
                    {isDropdownOpenOriginCountry && (
                      <ul className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-base-100 border rounded-lg shadow-lg z-20">
                        <li className="p-2 sticky top-0 bg-base-100">
                          <input
                            type="text"
                            value={searchInDropdownOriginCountry}
                            onChange={(e) =>
                              setSearchInDropdownOriginCountry(e.target.value)
                            }
                            placeholder="Search country..."
                            className="w-full border rounded px-2 py-1"
                          />
                        </li>
                        <li
                          key={`non-selected`}
                          onClick={() => handleSelectOriginCountry("")}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer"
                        >
                          <span>Non Selected</span>
                        </li>
                        {Object.keys(countryRegions)
                          .filter((item) =>
                            // countryRegions[item].name
                            //   .toLowerCase()
                            //   .includes(
                            //     searchInDropdownOriginCountry.toLowerCase()
                            //   )
                            isCharsInString(
                              searchInDropdownOriginCountry,
                              countryRegions[item].name
                            )
                          )
                          .map((region, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelectOriginCountry(region)}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer"
                            >
                              <img
                                src={countryRegions[region]?.flag}
                                alt={countryRegions[region]?.name}
                                className="w-5 h-4 rounded border"
                              />
                              <span>{countryRegions[region]?.name}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Original Language */}
                <div className="space-y-3">
                  <span className="block mb-2 text-[16px] font-bold">
                    Original Language
                  </span>

                  <div
                    ref={originalLanguageRef}
                    className="relative w-auto min-w-42 text-sm"
                  >
                    {/* BOX hiển thị quốc gia đã chọn */}
                    <button
                      onClick={() =>
                        setIsDropdownOpenOriginalLanguage(
                          !isDropdownOpenOriginalLanguage
                        )
                      }
                      className="w-full flex items-center justify-between border rounded-lg px-3 py-2 bg-base-100 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {selectedOriginalLanguage === "" ? (
                          <div>Non Selected</div>
                        ) : (
                          <>
                            <span>{selectedOriginalLanguage as string}</span>
                          </>
                        )}
                      </div>

                      <svg
                        className={`w-4 h-4 transition-transform ${
                          isDropdownOpenOriginalLanguage
                            ? "rotate-180"
                            : "rotate-0"
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
                    {isDropdownOpenOriginalLanguage && (
                      <ul className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-base-100 border rounded-lg shadow-lg z-20">
                        <li className="p-2 sticky top-0 bg-base-100">
                          <input
                            type="text"
                            value={searchInDropdownOriginalLanguage}
                            onChange={(e) =>
                              setSearchInDropdownOriginalLanguage(
                                e.target.value
                              )
                            }
                            placeholder="Search language..."
                            className="w-full border rounded px-2 py-1"
                          />
                        </li>
                        <li
                          key={`non-selected`}
                          onClick={() =>
                            handleSelectOriginalLanguage({
                              name: "",
                              english_name: "",
                              iso_639_1: "",
                            })
                          }
                          className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer"
                        >
                          <span>Non Selected</span>
                        </li>
                        {tmdbLanguages
                          .filter((item) =>
                            // item.english_name
                            //   .toLowerCase()
                            //   .includes(
                            //     searchInDropdownOriginalLanguage.toLowerCase()
                            //   )
                            isCharsInString(
                              searchInDropdownOriginalLanguage,
                              item.english_name
                            )
                          )
                          .map((language, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleSelectOriginalLanguage(language)
                              }
                              className="flex items-center gap-2 px-3 py-2 hover:bg-base-300 cursor-pointer"
                            >
                              <span>
                                {language.english_name}
                                {language.name && `(${language.name})`}
                              </span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Genres */}
                <div>
                  <span className="block mb-2 text-[16px] font-bold">
                    Genres
                  </span>

                  <span className="block mb-2 text-[14px]">Include</span>
                  <div className="flex flex-wrap gap-2">
                    {tvGenresArray.map((g, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full cursor-pointer ${
                          genres.includes(`${g.id}-${g.name}`)
                            ? "bg-blue-400 hover:bg-blue-500"
                            : "bg-base-300 hover:bg-gray-400"
                        }`}
                        onClick={() => toggleGenre(`${g.id}-${g.name}`)}
                      >
                        {language === "en"
                          ? [...replaceGenreNamInEnglish.keys()].includes(g.id)
                            ? replaceGenreNamInEnglish.get(g.id)
                            : g.name
                          : g.name}
                      </button>
                    ))}
                  </div>

                  <span className="block mt-2 mb-2 text-[14px]">Exclude</span>
                  <div className="flex flex-wrap gap-2">
                    {tvGenresArray.map((g, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full cursor-pointer ${
                          exclude_genres.includes(`${g.id}-${g.name}`)
                            ? "bg-blue-400 hover:bg-blue-500"
                            : "bg-base-300 hover:bg-gray-400"
                        }`}
                        onClick={() => toggleExcludeGenre(`${g.id}-${g.name}`)}
                      >
                        {language === "en"
                          ? [...replaceGenreNamInEnglish.keys()].includes(g.id)
                            ? replaceGenreNamInEnglish.get(g.id)
                            : g.name
                          : g.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <SingleRanger
                    value={vote_count_gte}
                    setValue={(newValue: number) => setVoteCountGte(newValue)}
                  />
                </div>

                <div className="space-y-2">
                  <DoubleRanger
                    min={vote_average_gte}
                    setMin={setVoteAverageGte}
                    max={vote_average_lte}
                    setMax={setVoteAverageLte}
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div className="w-[75%] p-2">
        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-2 mx-1">
            {Array.from({ length: 20 }, (_, index) => index).map(
              (item, index) => (
                <div key={item}>
                  <LoadingCard />
                </div>
              )
            )}
          </div>
        ) : data?.pages[0].results.length === 0 || !stableData ? (
          <div className="flex justify-center items-center mx-6 mt-7 text-[20px]">
            No Data Found
          </div>
        ) : stableData?.pages[0].results.length < 5 ? (
          <div className="flex justify-start items-center gap-6 mx-6">
            {stableData?.pages.map((page) =>
              page.results.map((tv, index) => (
                <div key={index}>
                  <TVSerieCard tv={tv} />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-6 mx-6">
            {stableData?.pages.map((page) =>
              page.results.map((tv, index) => (
                <div key={index}>
                  <TVSerieCard tv={tv} />
                </div>
              ))
            )}

            {hasNextPage && (
              <div className="w-full h-[300px] flex items-center justify-center bg-base-300">
                <button
                  disabled={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TVSerieDiscover;
