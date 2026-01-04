"use client";

import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { useThemeStore } from "@/store/themeStore";

interface EpisodeGroupItemProps {
  ep: TVEpisodeGroupsDetailEpisode;
}

export function EpisodeGroupItem({ ep }: EpisodeGroupItemProps) {
  const { theme } = useThemeStore();

  return (
    <div
      className={` ${
        theme === "light"
          ? "bg-neutral-400 hover:bg-neutral-500"
          : "bg-gray-800 hover:bg-gray-700"
      } rounded-xl overflow-hidden shadow-xl cursor-pointer`}
    >
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row gap-4 p-4 transition">
        {/* Thumbnail + Play Icon */}
        <div className="relative w-full md:w-56 aspect-video rounded-lg overflow-hidden group">
          <img
            src={`https://media.themoviedb.org/t/p/w227_and_h127_bestv2/${ep.still_path}`}
            alt={ep.name}
            className="
      w-full h-full object-cover 
      transition duration-300 
      group-hover:scale-110 group-hover:brightness-75
    "
          />

          {/* PLAY ICON — only on hover */}
          <div
            className="
      absolute inset-0 flex items-center justify-center
      opacity-0 group-hover:opacity-100 
      transition duration-300
    "
          >
            <div
              className="
        w-0 h-0 
        border-t-[18px] border-b-[18px] border-l-[28px]
        border-t-transparent border-b-transparent border-l-white
      "
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-xl font-semibold">
              Episode {ep.episode_number}: {ep.name}
            </h3>

            {/* Date + Rating */}
            <div className="flex gap-4 text-sm mt-1">
              <span>{formatDate(ep.air_date)}</span>
              <span>• ⭐ {ep.vote_average?.toFixed(1) ?? "N/A"}</span>
            </div>

            <p className="text-sm mt-3 line-clamp-2">
              {ep.overview || "No description available."}
            </p>
          </div>

          <p className="text-sm mt-3">{ep.runtime} minutes</p>
        </div>
      </div>
    </div>
  );
}
