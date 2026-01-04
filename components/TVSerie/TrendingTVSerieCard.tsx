import { clampText } from "@/utils/clampText";
import roundUpToDecimal from "@/utils/roundUpToDecimal";
import Link from "next/link";
import { useState } from "react";
import TVSerieWatchlistModal from "./TVSerieWatchlistModal";
import { List } from "lucide-react";

interface TrendingTVSerieCardProps {
  tv: TrendingTVSerie;
}

export default function TrendingTVSerieCard({ tv }: TrendingTVSerieCardProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <TVSerieWatchlistModal
        open={open}
        onClose={() => setOpen(false)}
        itemData={tv}
      />

      <div className="w-full text-center inline-block cursor-pointer transform transition-transform duration-300 hover:scale-105">
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

        <Link href={`/tv/${tv.id}`}>
          {/* Poster + rating */}
          <div className="relative rounded-lg overflow-visible">
            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w1280/${tv.poster_path}`}
              alt={tv.name}
              className="w-full h-[300px] object-cover rounded-lg shadow-[0_12px_30px_rgba(2,6,23,0.6)] block"
            />

            {/* Rating badge: overlaps outside bottom-right */}
            <div
              className={`absolute right-[-17px] bottom-[14px] w-[45px] h-[45px] rounded-full
                     flex items-center justify-center font-semibold text-sm
                     shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                     border-2 bg-black ${
                       tv.vote_average >= 7
                         ? "text-green-400 border-green-400"
                         : tv.vote_average >= 5
                         ? "text-yellow-400 border-yellow"
                         : "text-red-400 border-red"
                     } `}
              aria-label={`rating ${tv.vote_average}`}
            >
              {roundUpToDecimal(tv.vote_average, 1)}
            </div>
          </div>
        </Link>
        {/* Title & subtitle */}
        <div className="mt-2">
          <h3 className="flex justify-center items-center text-[15px] font-semibold leading-tight">
            {clampText(tv.name, 45)}
          </h3>

          <p className="text-[14px]">{tv.first_air_date}</p>
        </div>
      </div>
    </>
  );
}
