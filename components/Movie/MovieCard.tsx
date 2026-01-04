import roundUpToDecimal from "@/utils/roundUpToDecimal";
import Link from "next/link";

import Image from "next/image";

import cardPlaceholder from "../../assets/card_placeholder.jpg";
import { clampText } from "@/utils/clampText";

import { Heart, List } from "lucide-react";
import { useState } from "react";
import WatchlistModal from "./WatchlistModal";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <WatchlistModal
        open={open}
        onClose={() => setOpen(false)}
        itemData={movie}
      />

      <div className="w-full h-auto text-center inline-block cursor-pointer transform transition-transform duration-300 hover:scale-105 z-10">
        {/* Add to list buttons */}
        <div className="absolute flex justify-center items-center gap-2 right-[10px] top-[10px] z-10">
          <div
            onClick={() => setOpen(true)}
            className="hover:scale-110 transition-transform duration-200 z-20"
          >
            <List size={22} color="white" />
          </div>
          {/* <div className="hover:scale-110 transition-transform duration-200 z-20">
            <Heart size={22} color="white" />
          </div> */}
        </div>

        <Link href={`/movie/${movie.id}`}>
          {/* Poster + rating */}
          <div className="w-full h-[300px] relative rounded-lg overflow-visible">
            {/* Poster */}
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] object-cover rounded-lg shadow-[0_12px_30px_rgba(2,6,23,0.6)] block"
              />
            ) : (
              <Image
                src={cardPlaceholder}
                alt={movie.title}
                className="w-full h-[300px] object-cover rounded-lg shadow-[0_12px_30px_rgba(2,6,23,0.6)] block"
              />
            )}

            {/* Rating badge: overlaps outside bottom-right */}
            <div
              className={`absolute right-[-17px] bottom-[14px] w-[45px] h-[45px] rounded-full
                     flex items-center justify-center font-semibold text-sm
                     shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                     border-2 bg-black ${
                       movie.vote_count === 0
                         ? "text-gray-200 border-gray-200"
                         : movie.vote_average >= 7
                         ? "text-green-400 border-green-400"
                         : movie.vote_average >= 5
                         ? "text-yellow-400 border-yellow"
                         : "text-red-400 border-red"
                     } `}
              aria-label={`rating ${movie.vote_average}`}
            >
              {movie.vote_count === 0 ? (
                "NR"
              ) : (
                <>{roundUpToDecimal(movie.vote_average, 1)}</>
              )}
            </div>
          </div>

          {/* Title & subtitle */}
          <div className="mt-2">
            <div className="flex justify-center items-center text-[15px] font-semibold leading-tight">
              {clampText(movie.title, 35)}
            </div>

            <p className="text-[14px]">{movie.release_date}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
