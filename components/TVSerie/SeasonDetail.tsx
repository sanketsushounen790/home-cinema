"use client";

import { formatDate } from "@/utils/formatDate";
import roundUpToDecimal from "@/utils/roundUpToDecimal";
import Link from "next/link";
import EpisodeList from "./EpisodeList";
import useSeasonDetail from "./hook/useSeasonDetail";

interface SeasonDetailProps {
  tvId: string;
  seasonId: string;
}

const SeasonDetail = ({ tvId, seasonId }: SeasonDetailProps) => {
  const { data: result, isLoading: isResultLoading } = useSeasonDetail(
    tvId,
    seasonId
  );

  console.log(result);

  if (isResultLoading) {
    return (
      <div className="flex justify-center items-center mt-20">Loading...</div>
    );
  } else if (!result) {
    return (
      <div className="flex justify-center items-center mt-20">No Data</div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col justify-start items-center bg-base-100">
        <div className="w-[80%] h-auto flex justify-start items-start bg-base-300 shadow-lg gap-4 mt-8">
          <div className="relative">
            <div className="w-[260px] h-[390px] rounded-lg shadow-lg">
              <img
                className="h-full w-full rounded-lg"
                src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${result.poster_path}`}
              />
            </div>

            <div
              className={`absolute right-[20px] bottom-[-17px] w-[50px] h-[50px] rounded-full
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
          </div>

          <div className="w-[calc(100%-200px)] flex flex-col justify-center items-start px-4 pb-3">
            <div className="flex justify-center items-end gap-2">
              <div className="font-bold text-[25px]">{result.name}</div>
              {result?.air_date !== null && (
                <div className="font-bold text-[25px]">
                  ({result?.air_date.slice(0, 4)})
                </div>
              )}

              <div className="font-bold text-[20px]">
                • {result.episodes.length} Episodes
              </div>
            </div>

            <div className="text-[20px]">
              {result.overview === ""
                ? `Season ${result.season_number} of ${result.name} ${
                    result.air_date !== null
                      ? `premiered on ${formatDate(result.air_date)}`
                      : ``
                  } .`
                : result.overview}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-4 my-8">
          <EpisodeList episodes={result.episodes} tvId={tvId} />
        </div>
      </div>
    );
  }
};

export default SeasonDetail;
