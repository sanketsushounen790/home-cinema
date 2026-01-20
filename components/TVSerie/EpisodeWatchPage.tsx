"use client";

import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import WatchTabs from "./WatchTabs";
import { useRouter } from "next/navigation";
import useSeasonDetail from "./hook/useSeasonDetail";
import { useThemeStore } from "@/store/themeStore";

interface EpisodeWatchPageProps {
  credits: EpisodeCreditsResult;
  tvId: string;
  rootCommentId?: string;
  focusCommentId?: string;
  seasondId: string;
  episodeId: string;
  episodeIndex: number; // index để lấy episode ra từ mảng episode của result fetch season
}

const EpisodeWatchPage = ({
  credits,
  tvId,
  focusCommentId,
  rootCommentId,
  seasondId,
  episodeId,
  episodeIndex,
}: EpisodeWatchPageProps) => {
  const { theme } = useThemeStore();
  const router = useRouter();

  const { data: result, isLoading: isResultLoading } = useSeasonDetail(
    tvId,
    seasondId,
  );

  //console.log("result", result);

  const [currentEpCredits, setCurrentEpCredits] = useState(credits);

  const today = new Date().getTime();

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
      <div className="w-full h-auto flex justify-center items-center">
        <div className="w-[90%] flex flex-col md:flex-row gap-5 my-7">
          {/* LEFT: VIDEO PLAYER */}
          <div className="w-[70%]">
            <div className="w-full aspect-video overflow-hidden">
              {/* Demo iframe */}
              {/* <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/0owzdS2dyIU?si=bLTnIqhpR6Iamjtz"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe> */}
              <iframe
                className="w-full h-full"
                src={` https://www.2embed.cc/embedtv/${tvId}&s=${seasondId}&e=${episodeId}`}
                referrerPolicy="origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <WatchTabs
              tvId={tvId}
              focusCommentId={focusCommentId}
              rootCommentId={rootCommentId}
              episode={result.episodes[episodeIndex]}
              episode_credits={currentEpCredits}
            />
          </div>

          {/* RIGHT: EPISODE LIST */}
          {/* === RIGHT: Episode List === */}
          <div className="flex-1 w-full md:w-[400px] max-h-screen sticky top-0 overflow-y-auto bg-base-300 shadow-xl">
            {result.episodes
              .filter(
                (ep) =>
                  ep.air_date !== null &&
                  new Date(ep.air_date).getTime() <= today,
              )
              .map((ep, index) => (
                <div
                  key={ep.id}
                  className={`h-[90px] flex gap-3 p-2 m-2 rounded-md cursor-pointer border-[1px] border-gray-400 transition ${
                    ep.episode_number === Number(episodeId)
                      ? theme === "dark"
                        ? "bg-gray-800"
                        : "bg-blue-300"
                      : ""
                  } ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-blue-200"
                  }`}
                  onClick={() => {
                    router.push(
                      `/tv/${tvId}/season/${seasondId}/episode/${ep.episode_number}_${index}`,
                    );
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 aspect-video rounded-md overflow-hidden group">
                    <img
                      src={`https://image.tmdb.org/t/p/w227_and_h127_bestv2/${ep.still_path}`}
                      alt={ep.name}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    {/* Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="w-0 h-0 border-t-[18px] border-b-[18px] border-l-[28px] border-t-transparent border-b-transparent border-l-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-semibold text-sm line-clamp-2">
                      EP{ep.episode_number}. {ep.name}
                    </p>
                    <p className="text-xs">
                      {ep.runtime} min • {formatDate(ep.air_date)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
};

export default EpisodeWatchPage;
