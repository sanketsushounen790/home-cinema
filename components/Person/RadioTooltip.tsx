import { i18nMovieGenres, i18nTVGenres } from "@/utils/genresList";
import { isCrew, isMovie, isCast, isTV } from "@/utils/knownFor";
import roundUpToDecimal from "@/utils/roundUpToDecimal";
import { Heart, List, Watch, WatchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import cardPlaceholder from "../../assets/card_placeholder.jpg";
import Image from "next/image";
import { useLanguageStore } from "@/store/useLanguageStore";
import WatchlistModal from "../Movie/WatchlistModal";
import TVSerieWatchlistModal from "../TVSerie/TVSerieWatchlistModal";

interface RadioTooltipProps {
  credit:
    | PersonCastCreditMovie
    | PersonCastCreditTV
    | PersonCrewCreditMovie
    | PersonCrewCreditTV;
}

export default function RadioTooltip({ credit }: RadioTooltipProps) {
  const { language } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const [openWatchlistModal, setOpenWatchlistModal] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const movieGenresMap =
    i18nMovieGenres[language as keyof typeof i18nMovieGenres] ||
    i18nMovieGenres["en"];

  const tvGenresMap =
    i18nTVGenres[language as keyof typeof i18nTVGenres] || i18nTVGenres["en"];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {isMovie(credit) ? (
        <WatchlistModal
          open={openWatchlistModal}
          onClose={() => setOpenWatchlistModal(false)}
          itemData={credit}
        />
      ) : (
        <TVSerieWatchlistModal
          open={openWatchlistModal}
          onClose={() => setOpenWatchlistModal(false)}
          itemData={credit}
        />
      )}

      <div ref={wrapperRef} className="relative inline-block mt-2">
        {/* trigger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="
    group
    w-4 h-4 rounded-full border-2 border-slate-500
    flex items-center justify-center
    hover:border-slate-700
    transition cursor-pointer
  "
        >
          <span
            className={`
      w-2 h-2 rounded-full bg-slate-700
      transition-all duration-150
      scale-0 opacity-0
      group-hover:scale-100 group-hover:opacity-100
      ${open ? "scale-100 opacity-100" : ""}
    `}
          />
        </button>

        {/* tooltip */}
        {open && (
          <div
            className="
    absolute left-1/2 bottom-full mb-3 -translate-x-1/2 z-30
    origin-bottom
    transition-all duration-200 ease-out
    animate-in fade-in slide-in-from-bottom-2 zoom-in-95
  "
          >
            {/* arrow */}
            <div
              className="
      absolute left-1/2 -bottom-1.5 -translate-x-1/2
      w-3 h-3 rotate-45 bg-[#0b2239]
    "
            />

            <div
              className="
      w-[650px] h-[300px] rounded-lg bg-base-300 shadow-[0_10px_30px_rgba(0,0,0,0.35)]
      p-4
    "
            >
              <div className="h-[170px] flex gap-4">
                {/* poster */}
                {credit?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w1280/${credit?.poster_path}`}
                    alt=""
                    className="w-[190px] h-[270px] rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <Image
                    src={cardPlaceholder}
                    alt={`item image`}
                    className="w-[190px] h-[270px] object-cover rounded-lg shadow-[0_12px_30px_rgba(2,6,23,0.6)] block"
                  />
                )}

                {/* content */}
                <div className="h-[170px] flex-1 min-w-0">
                  <div className="overflow-hidden flex items-center gap-2">
                    {/* title */}
                    {isMovie(credit) ? (
                      <div className="overflow-hidden flex items-center gap-2">
                        <Link
                          href={`/movie/${credit.id}`}
                          className="font-bold text-[18px] leading-tight hover:underline cursor-pointer"
                        >
                          {credit?.title}{" "}
                          {credit?.release_date
                            ? `(${credit.release_date.slice(0, 4)})`
                            : ``}
                        </Link>
                      </div>
                    ) : (
                      <div className="overflow-hidden flex items-center gap-2">
                        <Link
                          href={`/tv/${credit.id}`}
                          className="font-bold text-[18px] leading-tight hover:underline cursor-pointer"
                        >
                          {credit?.name} ({credit.first_air_date.slice(0, 4)})
                        </Link>
                      </div>
                    )}

                    <div
                      className={`absolute top-[230px] left-[185px] w-[45px] h-[45px] rounded-full
                     flex items-center justify-center font-semibold text-sm
                     shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                     border-2 bg-black ${
                       credit?.vote_average >= 7
                         ? "text-green-400 border-green-400"
                         : credit?.vote_average >= 5
                         ? "text-yellow-400 border-yellow"
                         : "text-red-400 border-red"
                     } `}
                      aria-label={`rating ${credit?.vote_average}`}
                    >
                      {roundUpToDecimal(credit?.vote_average, 1)}
                    </div>
                  </div>

                  {/* genres */}
                  <div className="mt-2">
                    {isMovie(credit) ? (
                      <div className="w-auto flex flex-wrap justify-start items-center gap-2">
                        {credit.genre_ids.map((genreId, index) => (
                          <Link
                            key={index}
                            href={`/genre/movie/${genreId}-${movieGenresMap.get(
                              genreId
                            )}`}
                          >
                            <div
                              className="inline-block px-3 py-1 text-sm font-medium rounded-full border border-base-content
                     bg-base-100 hover:bg-base-300 transition-colors cursor-pointer"
                            >
                              {movieGenresMap.get(genreId)}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="w-auto flex flex-wrap justify-start items-center gap-2">
                        {credit.genre_ids.map((genreId, index) => (
                          <Link
                            key={index}
                            href={`/genre/tv/${genreId}-${tvGenresMap.get(
                              genreId
                            )}`}
                          >
                            <div
                              className="inline-block px-3 py-1 text-sm font-medium rounded-full border border-base-content
                     bg-base-100 hover:bg-base-300 transition-colors cursor-pointer"
                            >
                              {tvGenresMap.get(genreId)}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* overview */}
                  <p className="text-[15px] mt-2 line-clamp-3">
                    {credit.overview}
                  </p>

                  {/* actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setOpenWatchlistModal(true)}
                      className="w-9 h-9 rounded bg-[#1da1f2] hover:bg-[#1991da] transition flex items-center justify-center cursor-pointer"
                    >
                      <List />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
