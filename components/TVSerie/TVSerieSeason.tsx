import Image from "next/image";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import fetchTVSerieEpisodeGroups from "@/services/TVSerieList/fetchTVSerieEpisodeGroups";

import fetchTVEpisodeGroupsDetail from "@/services/TVSerieList/fetchTVEpisodeGroupsDetail";
import { episodeGroupTypes } from "@/utils/episodeGroupTypes";
import roundUpToDecimal from "@/utils/roundUpToDecimal";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import EpisodeGroupModal from "./EpisodeGroupModal";
import { EpisodeGroupItem } from "./EpisodeGroupItem";

import cardPlaceholder from "../../assets/card_placeholder.jpg";

interface TVSerieSeasonProps {
  result: TVSerieDetailResult;
}

function reverseArray(arr: TVSerieSeason[]) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

const TVSerieSeason = ({ result }: TVSerieSeasonProps) => {
  const queryClient = useQueryClient();
  const [currentTvEpisodeGroupId, setCurrentTvEpisodeGroupId] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<
    TVEpisodeGroupsDetailGroup | undefined
  >(undefined);

  //console.log(currentTvEpisodeGroupId);

  const { isLoading, error, data } = useQuery({
    queryKey: ["getTVSerieEpisodeGroups", result.id],
    queryFn: () => fetchTVSerieEpisodeGroups(result.id),
    staleTime: Infinity,
  });

  const {
    isLoading: isTVEpisodeGroupsDetailLoading,
    error: TVEpisodeGroupsDetailError,
    data: TVEpisodeGroupsDetailData,
    refetch: refetchTVEpisodeGroupsDetailData,
  } = useQuery({
    queryKey: ["getTVEpisodeGroupsDetail", currentTvEpisodeGroupId],
    queryFn: () => fetchTVEpisodeGroupsDetail(currentTvEpisodeGroupId),
    enabled: currentTvEpisodeGroupId !== "",
  });

  //console.log("getTVSerieEpisodeGroupsDetail", TVEpisodeGroupsDetailData);
  return (
    <div className="w-[90%]">
      <div className="flex justify-start items-center gap-3 mb-4">
        <div className="w-auto font-bold text-[25px]">
          Seasons ({result.seasons.length})
        </div>

        <div className="flex justify-start items-center gap-2 ml-3">
          <div className="font-bold text-[20px]">Group By</div>
          <select
            name="episode-groups"
            id="episode-groups"
            className="cursor-pointer border border-base-content rounded-md px-2 py-1 bg-base-100"
            onChange={(e: any) => {
              console.log("value", e.target.value);
              setCurrentTvEpisodeGroupId(e.target.value);
              if (currentTvEpisodeGroupId !== "") {
                queryClient.invalidateQueries({
                  queryKey: [
                    "getTVEpisodeGroupsDetail",
                    currentTvEpisodeGroupId,
                  ],
                });
              }
            }}
          >
            <option key={`original-air-date`} value="">
              Original Air Date
            </option>
            {data?.results.map((result, index) => (
              <option key={index} value={result.id}>
                {result.name} ({episodeGroupTypes[result.type]})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full flex flex-col gap-8 bg-base-100 mt-2">
        <EpisodeGroupModal isOpen={open} onClose={() => setOpen(false)}>
          <div className="w-full h-full flex flex-col justify-start items-center gap-4">
            {selectedGroup !== undefined &&
              selectedGroup.episodes.map((episode, index) => (
                <div key={episode.id} className="w-full">
                  <EpisodeGroupItem ep={episode} />
                </div>
              ))}
          </div>
        </EpisodeGroupModal>

        {currentTvEpisodeGroupId !== "" ? (
          <>
            {isTVEpisodeGroupsDetailLoading ? (
              <div>Loading...</div>
            ) : TVEpisodeGroupsDetailData !== undefined ? (
              <div className="w-full h-auto flex flex-col justify-center items-start gap-8">
                {TVEpisodeGroupsDetailData?.groups.map((group, index) => (
                  <div
                    key={group.id}
                    className="w-full h-[55px] flex justify-start items-center p-3 shadow-xl bg-base-300"
                  >
                    <div
                      onClick={() => {
                        setOpen(true);
                        setSelectedGroup(group);
                      }}
                      className="font-bold text-[20px] hover:underline cursor-pointer"
                    >
                      {" "}
                      {group.name} {group.episodes.length}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {reverseArray(result.seasons).map((season, index) => (
              <div
                key={index}
                className="w-full h-full flex justify-start items-start rounded-lg shadow-xl gap-4 bg-base-300"
              >
                <div className="relative rounded-lg">
                  <div className="w-[260px] h-[390px] rounded-lg">
                    {season?.poster_path ? (
                      <img
                        className="h-full w-full rounded-lg"
                        src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2${season?.poster_path}`}
                        alt={season.name}
                      />
                    ) : (
                      <Image
                        src={cardPlaceholder}
                        alt={season.name}
                        className="h-full w-full rounded-lg"
                      />
                    )}
                  </div>

                  <div
                    className={`absolute right-[20px] bottom-[-17px] w-[50px] h-[50px] rounded-full
                     flex items-center justify-center font-semibold text-sm
                     shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                     border-2 bg-black ${
                       season?.vote_average >= 7
                         ? "text-green-400 border-green-400"
                         : season?.vote_average >= 5
                           ? "text-yellow-400 border-yellow"
                           : season?.vote_average === 0
                             ? "text-gray-400 border-gray-400"
                             : "text-red-400 border-red"
                     } `}
                    aria-label={`rating ${season?.vote_average}`}
                  >
                    {season?.vote_average === 0 ? (
                      "NR"
                    ) : (
                      <> {roundUpToDecimal(season?.vote_average, 1)}</>
                    )}
                  </div>
                </div>

                <div className="w-[calc(100%-200px)] flex flex-col justify-center items-start px-4 pb-3">
                  <div className="flex justify-center items-end gap-2">
                    <div className="font-bold text-[25px]">{season.name}</div>
                    {season?.air_date !== null && (
                      <div className="font-bold text-[25px]">
                        ({season?.air_date.slice(0, 4)})
                      </div>
                    )}

                    <div className="font-bold text-[20px]">
                      • {season.episode_count} Episodes
                    </div>
                  </div>

                  <div className="text-[20px]">
                    {season.overview === ""
                      ? `Season ${
                          season.season_number === 0
                            ? "Special"
                            : season.season_number
                        } of ${result.name} premiered on ${formatDate(
                          season.air_date,
                        )}.`
                      : season.overview}
                  </div>

                  <div className="flex justify-center items-center gap-4 font-bold text-[23px] mt-2">
                    <Link
                      href={`/tv/${result.id}/season/${season.season_number}`}
                      className="hover:underline cursor-pointer"
                    >
                      <button className="btn btn-outline">Detail</button>
                    </Link>

                    <Link
                      href={`/tv/${result.id}/season/${season.season_number}/episode/1_0`}
                      className="hover:underline cursor-pointer"
                    >
                      <button className="btn btn-outline">Watch Now</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TVSerieSeason;
