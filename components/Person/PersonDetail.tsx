"use client";

import {
  getTop10Credits,
  isCast,
  isCrew,
  isMovie,
  isTV,
} from "@/utils/knownFor";
import TruncatedText from "../Shared_Components/TruncatedText";
import PersonKnownForCreditsCard from "./PersonKnownForCreditsCard";

import { getDate } from "@/utils/sortByYear";
import { groupCredits, mergeCrewCredits } from "@/utils/groupCredits";
import { countMovieAndTV } from "@/utils/countMovieAndTV";
import { useEffect, useState } from "react";
import Link from "next/link";
import RadioTooltip from "./RadioTooltip";

import maleAvatar from "../../assets/male_avatar.jpg";
import femaleAvatar from "../../assets/female_avatar.jpg";
import Image from "next/image";
import usePersonDetail from "./hook/usePersonDetail";
import usePersonExternalIds from "./hook/usePersonExternalIds";
import { SocialLinks } from "./SocialLinks";
import { calculateAge } from "@/utils/calculateAge";

interface PersonDetailProps {
  //result: PersonDetailResult;
  id: string;
}

const PersonDetail = ({ id }: PersonDetailProps) => {
  const { data: result, isLoading } = usePersonDetail(id);
  const { data: socialLinks, isLoading: isSocialLinksLoading } =
    usePersonExternalIds(id);

  console.log(socialLinks);

  const { movie, tv } = countMovieAndTV(
    result?.combined_credits || { cast: [], crew: [] }
  );
  //console.log(movie, tv);

  const [selectedMediaType, setSelectedMediaType] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  //console.log(selectedMediaType);

  const top10PersonPopularMovieOrTV = getTop10Credits(
    result?.combined_credits?.cast || [],
    result?.combined_credits?.crew || []
  );

  const [filteredMovieCast, setFilteredMovieCast] = useState(
    result?.combined_credits?.cast || []
  );
  const [filteredMovieCrew, setFilteredMovieCrew] = useState(
    result?.combined_credits?.crew || []
  );

  useEffect(() => {
    if (isLoading || !result) return;

    // Không filter gì hết
    if (selectedMediaType === "all") {
      setFilteredMovieCast(result?.combined_credits.cast || []);
      setFilteredMovieCrew(result?.combined_credits.crew || []);
      return;
    }

    // Filter theo tv/movie
    const castFiltered =
      selectedMediaType === "tv-shows"
        ? result.combined_credits.cast.filter((item) => isTV(item))
        : result.combined_credits.cast.filter((item) => isMovie(item));

    const crewFiltered =
      selectedMediaType === "tv-shows"
        ? result.combined_credits.crew.filter((item) => isTV(item))
        : result.combined_credits.crew.filter((item) => isMovie(item));

    setFilteredMovieCast(castFiltered);
    setFilteredMovieCrew(crewFiltered);
  }, [selectedMediaType, result]);

  const grouped = groupCredits(filteredMovieCast, filteredMovieCrew);

  // 🔥 Merge ngay sau khi grouped
  Object.keys(grouped).forEach((key) => {
    // @ts-ignore
    grouped[key] = mergeCrewCredits(grouped[key] as any);
  });

  //console.log("grouped", grouped);

  // Lấy danh sách keys theo thứ tự bạn đang dùng
  // Tạo thứ tự key dựa theo know_for_department
  const keys = Object.keys(grouped).sort((a, b) => {
    const topDepartments: (string | undefined)[] =
      result?.known_for_department === "Acting"
        ? ["Acting"]
        : result?.known_for_department === "Directing"
        ? ["Directing", "Writing"]
        : [result?.known_for_department];

    const indexA = topDepartments.indexOf(a);
    const indexB = topDepartments.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB; // cả 2 đều top → giữ thứ tự top
    if (indexA !== -1) return -1; // a top → trước
    if (indexB !== -1) return 1; // b top → trước
    return 0; // các key còn lại giữ nguyên thứ tự
  });

  //console.log("keys", keys);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">Loading...</div>
    );
  } else if (!result) {
    return (
      <div className="flex justify-center items-center mt-20">No Data</div>
    );
  } else {
    return (
      <div className="flex justify-center items-start pt-4 mb-12 mt-4">
        <div className="w-[350px] flex flex-col justify-center items-start p-4 bg-base-300 shadow-lg">
          {result?.profile_path ? (
            <img
              className="w-[300px] h-[400px] rounded-lg"
              src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${result.profile_path}`}
              alt={result.name}
            />
          ) : result?.gender === 2 ? (
            <Image
              src={maleAvatar}
              alt={result?.name as string}
              className="w-[290px] h-[350px] rounded-lg"
            />
          ) : (
            <Image
              src={femaleAvatar}
              alt={result?.name as string}
              className="w-[290px] h-[350px] rounded-lg"
            />
          )}

          <div className="font-bold text-[23px] mt-4">Personal Info</div>
          {isSocialLinksLoading ? (
            <div>Loading...</div>
          ) : (
            socialLinks && <SocialLinks externalIds={socialLinks} />
          )}

          <div>
            <div className="font-bold text-[20px]">Stage Name</div>

            <div>{result?.name}</div>
          </div>
          <div>
            <div className="font-bold text-[20px] mt-1">Known For</div>

            <div>{result?.known_for_department}</div>
          </div>

          <div className="">
            <div className="font-bold text-[20px] mt-1">Known Credits</div>

            <div>
              {String(
                result?.combined_credits?.cast.length +
                  result?.combined_credits?.crew.length
              )}
            </div>
          </div>

          <div className="">
            <div className="font-bold text-[20px] mt-1">Gender</div>

            <div>{result?.gender === 2 ? "Male" : "Female"}</div>
          </div>

          <div className="">
            <div className="font-bold text-[20px] mt-1">Birthday</div>

            {result?.deathday === null ? (
              <div>
                {result?.birthday} ({calculateAge(result?.birthday)} years old)
              </div>
            ) : (
              <div>
                {result?.birthday} to {result?.deathday} (
                {calculateAge(result?.birthday)} years old)
              </div>
            )}
          </div>

          <div className="">
            <div className="font-bold text-[20px] mt-1">Place of Birth</div>

            <div className="flex flex-wrap">{result?.place_of_birth}</div>
          </div>

          <div className="">
            <div className="font-bold text-[20px] mt-1">Also Known As</div>

            <div>
              {result?.also_known_as.map((alt_name, index) => (
                <p key={index}>{alt_name}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[70%] p-4 bg-base-200 shadow-lg">
          <div className="font-bold text-[28px]">{result?.name}</div>

          {result?.biography && (
            <>
              <div className="font-bold text-[20px]">Biography</div>
              <TruncatedText text={result?.biography} maxLength={550} />
            </>
          )}

          <div className="w-full">
            <div className="font-bold text-[20px]">Known For</div>
            <div className="w-full h-auto flex flex-col justify-start items-center">
              <div className="w-full max-w-auto h-[410px] px-6 py-5 flex justify-start items-start gap-7 overflow-x-scroll z-[10] touch-pan-x scroll-smooth">
                {top10PersonPopularMovieOrTV.map((product, index) => (
                  <div
                    key={index}
                    className="w-[200px] h-[300px] flex-shrink-0 rounded-lg bg-base-300"
                  >
                    <PersonKnownForCreditsCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full">
              <div className="w-auto absolute top-[-10px] right-[0px] flex justify-end items-center gap-4 font-bold text-[20px]">
                <select
                  className="cursor-pointer border border-base-content rounded-md px-2 py-1 bg-base-100"
                  name="media_type"
                  id="media_type"
                  value={selectedMediaType}
                  onChange={(e) => setSelectedMediaType(e.target.value)}
                >
                  <option
                    key="all-media-types"
                    value={"all"}
                    className="cursor-pointer"
                  >
                    All
                  </option>
                  <option
                    key="movies"
                    value={`movies`}
                    className="cursor-pointer"
                  >
                    Movies ({movie})
                  </option>
                  <option
                    key="tv-shows"
                    value={`tv-shows`}
                    className="cursor-pointer"
                  >
                    TV Shows ({tv})
                  </option>
                </select>

                <select
                  className="cursor-pointer border border-base-content rounded-md px-2 py-1 bg-base-100"
                  name="department"
                  id="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option key="all-departments" value="all">
                    All
                  </option>
                  {keys.map((key, index) => (
                    <option key={index} value={key}>
                      {key} ({grouped[key].length})
                    </option>
                  ))}
                </select>
              </div>

              {selectedDepartment === "all" ? (
                <div>
                  {keys.map((creditKey, index) => {
                    // Lấy danh sách đã sort theo know_for_department
                    // Sort lần nữa theo năm sản xuất/ra mắt của sản phẩm
                    const sorted = [...(grouped[creditKey] ?? [])].sort(
                      (a, b) => {
                        const dateA = getDate(a);
                        const dateB = getDate(b);

                        if (dateA === null && dateB === null) return 0;
                        if (dateA === null) return -1;
                        if (dateB === null) return 1;

                        return dateB.getTime() - dateA.getTime(); // mới → cũ
                      }
                    );

                    return (
                      <div key={creditKey} className="mt-7">
                        <div className="w-full flex justify-center items-center mb-2 font-bold text-[20px]">
                          <div className="w-full font-bold text-[23px]">
                            {" "}
                            {creditKey}{" "}
                          </div>
                        </div>

                        <div className="px-5 pt-2 pb-1 shadow-xl bg-base-300">
                          {sorted.map((credit, index) => {
                            // ==== LẤY NĂM CHUẨN ====
                            const raw =
                              "release_date" in credit
                                ? credit.release_date
                                : "first_air_date" in credit
                                ? credit.first_air_date
                                : "";

                            let lastYear: string | null = null;
                            const year =
                              raw && raw.length >= 4 && raw !== ""
                                ? raw.slice(0, 4)
                                : "-----";

                            const isNewYear = year !== lastYear;
                            lastYear = year;

                            return (
                              <div key={index}>
                                {/* ==== HEADER NĂM ==== */}
                                {isNewYear && index !== 0 && (
                                  <div className="border-b border-gray-400 text-[18px] font-semibold"></div>
                                )}
                                {/* ==== ITEM ===== */}
                                {isMovie(credit) && isCrew(credit) ? (
                                  <div className="flex justify-start items-start gap-5 mt-3 mb-3">
                                    <div className="mt-1 pl-2">{year}</div>
                                    <RadioTooltip credit={credit} />
                                    <div className="flex flex-col justify-start items-start">
                                      <Link
                                        href={`/movie/${credit.id}`}
                                        className="font-bold text-[20px] hover:text-blue-400 cursor-pointer"
                                      >
                                        {credit.title}
                                      </Link>

                                      <div className="flex flex-col justify-start items-start text-[17px]">
                                        {/* @ts-ignore */}
                                        {credit?.job.map((item, index) => (
                                          <div key={index}>... {item}</div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ) : isMovie(credit) && isCast(credit) ? (
                                  <div className="flex justify-start items-start gap-5 mt-3 mb-3">
                                    <div className="mt-1 pl-2">{year}</div>
                                    <RadioTooltip credit={credit} />
                                    <div className="flex flex-col justify-center items-start">
                                      <Link
                                        href={`/movie/${credit.id}`}
                                        className="font-bold text-[20px] hover:text-blue-400 cursor-pointer"
                                      >
                                        {credit.title}
                                      </Link>
                                      {credit.character === "" ? (
                                        <></>
                                      ) : (
                                        <div className="flex justify-center items-center text-[17px] gap-1">
                                          as
                                          <div className="font-bold">
                                            {credit.character}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ) : isTV(credit) && isCrew(credit) ? (
                                  <div className="flex justify-start items-start gap-5 mt-3 mb-3">
                                    <div className="mt-1 pl-2">{year}</div>
                                    <RadioTooltip credit={credit} />
                                    <div className="w-full flex flex-col justify-start items-start">
                                      <Link
                                        href={`/tv/${credit.id}`}
                                        className="font-bold text-[20px] hover:text-blue-400 cursor-pointer"
                                      >
                                        {credit.name}
                                      </Link>

                                      <div className="w-full flex flex-col justify-center items-start">
                                        {/* @ts-ignore */}
                                        {credit?.job.map((item, index) => (
                                          <div
                                            key={index}
                                            className="w-full flex justify-start items-center"
                                          >
                                            {/* @ts-ignore */}
                                            {credit?.episode_count.length ===
                                            0 ? (
                                              <></>
                                            ) : (
                                              <Link
                                                href={`/tv/${credit.id}/credit/crew-${credit.credit_id[index]}`}
                                              >
                                                <div className="w-auto flex justify-start items-center text-[17px] text-gray-500 hover:underline cursor-pointer">
                                                  {/* @ts-ignore */}
                                                  {credit?.episode_count[index]}
                                                  {/* @ts-ignore */}
                                                  {credit?.episode_count[
                                                    index
                                                  ] > 1
                                                    ? " episodes"
                                                    : " episode"}
                                                </div>
                                              </Link>
                                            )}

                                            {/* @ts-ignore */}
                                            {credit?.episode_count.length ===
                                            0 ? (
                                              <div className="text-[17px]">
                                                ... {item}
                                              </div>
                                            ) : (
                                              <div className="ml-2 text-[17px]">
                                                ... {item}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex justify-start items-start gap-5 mt-3 mb-3">
                                    <div className="mt-1 pl-2">{year}</div>
                                    <RadioTooltip credit={credit} />
                                    <div className="flex flex-col justify-center items-start">
                                      <Link
                                        href={`/tv/${credit.id}`}
                                        className="font-bold text-[20px] hover:text-blue-400 cursor-pointer"
                                      >
                                        {credit.name}
                                      </Link>

                                      {credit.character === "" ? (
                                        <></>
                                      ) : (
                                        <div className="flex justify-center items-start gap-1">
                                          <Link
                                            href={`/tv/${credit.id}/credit/cast-${credit.credit_id}`}
                                          >
                                            <div className="text-[17px] hover:underline cursor-pointer text-gray-500">
                                              {credit.episode_count} episode
                                              {credit.episode_count > 1
                                                ? "s"
                                                : ""}{" "}
                                            </div>
                                          </Link>
                                          <div className="text-[17px]">as</div>
                                          <div className="text-[17px] font-bold">
                                            {credit.character}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <div key={selectedDepartment} className="mt-7">
                    <div className="w-full flex justify-center items-center mb-2 font-bold text-[20px]">
                      <div className="w-full font-bold text-[23px]">
                        {" "}
                        {selectedDepartment}{" "}
                      </div>
                    </div>

                    <div className="px-5 pt-2 pb-1 shadow-xl bg-base-300">
                      {[...(grouped[selectedDepartment] ?? [])]
                        .sort((a, b) => {
                          const dateA = getDate(a);
                          const dateB = getDate(b);

                          if (dateA === null && dateB === null) return 0;
                          if (dateA === null) return -1;
                          if (dateB === null) return 1;

                          return dateB.getTime() - dateA.getTime(); // mới → cũ
                        })
                        .map((credit, index) => {
                          // ==== LẤY NĂM CHUẨN ====
                          const raw =
                            "release_date" in credit
                              ? credit.release_date
                              : "first_air_date" in credit
                              ? credit.first_air_date
                              : "";

                          let lastYear: string | null = null;
                          const year =
                            raw && raw.length >= 4 && raw !== ""
                              ? raw.slice(0, 4)
                              : "-----";

                          const isNewYear = year !== lastYear;
                          lastYear = year;

                          return (
                            <div key={index}>
                              {/* ==== HEADER NĂM ==== */}
                              {isNewYear && index !== 0 && (
                                <div className="border-b border-gray-400 text-[18px] font-semibold"></div>
                              )}
                              {/* ==== ITEM ===== */}
                              {isMovie(credit) && isCrew(credit) ? (
                                <div className="flex justify-start items-start gap-5 mt-3 mb-3">
                                  <div className="mt-1 pl-2">{year}</div>
                                  <RadioTooltip credit={credit} />
                                  <div className="flex flex-col justify-start items-start">
                                    <div className="font-bold text-[20px] hover:text-blue-400 cursor-pointer">
                                      {credit.title}
                                    </div>

                                    <div className="flex flex-col justify-start items-start text-[17px]">
                                      {/* @ts-ignore */}
                                      {credit?.job.map((item, index) => (
                                        <div key={index}>... {item}</div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ) : isMovie(credit) && isCast(credit) ? (
                                <div className="flex justify-start items-start gap-5 mt-3 mb-3">
                                  <div className="mt-1 pl-2">{year}</div>
                                  <RadioTooltip credit={credit} />
                                  <div className="flex flex-col justify-center items-start">
                                    <div className="font-bold text-[20px] hover:text-blue-400 cursor-pointer">
                                      {credit.title}
                                    </div>
                                    {credit.character === "" ? (
                                      <></>
                                    ) : (
                                      <div className="flex justify-center items-center text-[17px] gap-1">
                                        as
                                        <div className="font-bold">
                                          {credit.character}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : isTV(credit) && isCrew(credit) ? (
                                <div className="flex justify-start items-start gap-5 mt-3 mb-3">
                                  <div className="mt-1 pl-2">{year}</div>
                                  <RadioTooltip credit={credit} />
                                  <div className="w-full flex flex-col justify-start items-start">
                                    <div className="font-bold text-[20px] hover:text-blue-400 cursor-pointer">
                                      {credit.name}
                                    </div>

                                    <div className="w-full flex flex-col justify-center items-start">
                                      {/* @ts-ignore */}
                                      {credit?.job.map((item, index) => (
                                        <div
                                          key={index}
                                          className="w-full flex justify-start items-center"
                                        >
                                          {/* @ts-ignore */}
                                          {credit?.episode_count.length ===
                                          0 ? (
                                            <></>
                                          ) : (
                                            <Link
                                              href={`/tv/${credit.id}/credit/crew-${credit.credit_id[index]}`}
                                            >
                                              <div className="w-auto flex justify-start items-center text-[17px] text-gray-500 hover:underline cursor-pointer">
                                                {/* @ts-ignore */}
                                                {credit?.episode_count[index]}
                                                {/* @ts-ignore */}
                                                {credit?.episode_count[index] >
                                                1
                                                  ? " episodes"
                                                  : " episode"}
                                              </div>
                                            </Link>
                                          )}

                                          {/* @ts-ignore */}
                                          {credit?.episode_count.length ===
                                          0 ? (
                                            <div className="text-[17px]">
                                              ... {item}
                                            </div>
                                          ) : (
                                            <div className="ml-2 text-[17px]">
                                              ... {item}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-start items-start gap-5 mt-3 mb-3">
                                  <div className="mt-1 pl-2">{year}</div>
                                  <RadioTooltip credit={credit} />
                                  <div className="flex flex-col justify-center items-start">
                                    <div className="font-bold text-[20px] hover:text-blue-400 cursor-pointer">
                                      {credit.name}
                                    </div>

                                    {credit.character === "" ? (
                                      <></>
                                    ) : (
                                      <div className="flex justify-center items-start gap-1">
                                        <Link
                                          href={`/tv/${credit.id}/credit/cast-${credit.credit_id}`}
                                        >
                                          <div className="text-[17px] hover:underline cursor-pointer text-gray-500">
                                            {credit.episode_count} episode
                                            {credit.episode_count > 1
                                              ? "s"
                                              : ""}{" "}
                                          </div>
                                        </Link>
                                        <div className="text-[17px]">as</div>
                                        <div className="text-[17px] font-bold">
                                          {credit.character}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PersonDetail;
