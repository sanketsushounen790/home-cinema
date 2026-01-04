import { isMovie } from "@/utils/checkCreditTypes";
import { clampText } from "@/utils/clampText";
import roundUpToDecimal from "@/utils/roundUpToDecimal";
import Link from "next/link";
import cardPlaceholder from "../../assets/card_placeholder.jpg";
import Image from "next/image";
import { List } from "lucide-react";
import { useState } from "react";
import WatchlistModal from "../Movie/WatchlistModal";
import { isTV } from "@/utils/knownFor";
import TVSerieWatchlistModal from "../TVSerie/TVSerieWatchlistModal";

interface PersonKnownForCreditsCardProps {
  product:
    | PersonCastCreditMovie
    | PersonCastCreditTV
    | PersonCrewCreditMovie
    | PersonCrewCreditTV;
}

export default function PersonKnownForCreditsCard({
  product,
}: PersonKnownForCreditsCardProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {isMovie(product) ? (
        <WatchlistModal
          open={open}
          onClose={() => setOpen(false)}
          itemData={product}
        />
      ) : (
        isTV(product) && (
          <TVSerieWatchlistModal
            open={open}
            onClose={() => setOpen(false)}
            itemData={product}
          />
        )
      )}

      <div className="w-full text-center inline-block cursor-pointer transform transition-transform duration-300 hover:scale-105 -z-5">
        {/* Add to list buttons */}
        <div className="absolute flex justify-center items-center gap-2 right-[10px] top-[10px] z-30">
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

        <Link
          href={
            isMovie(product) ? `/movie/${product?.id}` : `/tv/${product.id}`
          }
        >
          {/* Poster + rating */}
          <div className="relative rounded-lg overflow-visible">
            {/* Poster */}
            {product?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w1280/${product?.poster_path}`}
                alt="poster"
                className="w-full h-[300px] object-cover rounded-lg shadow-[0_12px_30px_rgba(2,6,23,0.6)] block"
              />
            ) : (
              <Image
                src={cardPlaceholder}
                alt="poster"
                className="w-full h-[300px] object-cover rounded-lg shadow-[0_12px_30px_rgba(2,6,23,0.6)] block"
              />
            )}

            {/* Rating badge: overlaps outside bottom-right */}
            <div
              className={`absolute right-[-17px] bottom-[14px] w-[45px] h-[45px] rounded-full
                     flex items-center justify-center font-semibold text-sm
                     shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                     border-2 bg-black ${
                       product.vote_average >= 7
                         ? "text-green-400 border-green-400"
                         : product.vote_average >= 5
                         ? "text-yellow-400 border-yellow"
                         : "text-red-400 border-red"
                     } `}
              aria-label={`rating ${product.vote_average}`}
            >
              {roundUpToDecimal(product.vote_average, 1)}
            </div>
          </div>

          {/* Title & subtitle */}
          <div className="mt-2">
            {"title" in product ? (
              <h3 className="flex justify-center items-center text-[15px] font-semibold leading-tight">
                {clampText(product?.title, 35)}
              </h3>
            ) : (
              <h3 className="flex justify-center items-center text-[15px] font-semibold leading-tight">
                {clampText(product?.name, 35)}
              </h3>
            )}

            {"release_date" in product ? (
              <p className="text-[14px]">{product?.release_date}</p>
            ) : (
              <p className="text-[14px]">{product?.first_air_date}</p>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}
