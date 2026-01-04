"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import roundUpToDecimal from "@/utils/roundUpToDecimal";
import { i18nMovieGenres, i18nTVGenres } from "@/utils/genresList";
import Link from "next/link";
import useMoviesCarousel from "./hook/useMoviesCarousel";
import { useLanguageStore } from "@/store/useLanguageStore";
import { motion } from "framer-motion";
import useTVSeriesCarousel from "./hook/useTVSeriesCarousel";

const MovieCarousel = () => {
  const [mediaType, setMediaType] = useState<string>("movie");
  const { language } = useLanguageStore();

  const {
    data: movies,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
    error: moviesError,
  } = useMoviesCarousel();
  const {
    data: tvSeries,
    isLoading: isTVSeriesLoading,
    isError: isTVSeriesError,
    error: tvSeriesError,
  } = useTVSeriesCarousel();

  const movieGenresMap =
    i18nMovieGenres[language as keyof typeof i18nMovieGenres] ||
    i18nMovieGenres["en"];

  const tvGenresMap =
    i18nTVGenres[language as keyof typeof i18nTVGenres] || i18nTVGenres["en"];

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div className="absolute top-[10px] left-[10px] z-100">
        <div className="relative flex bg-[#e9eef3] rounded-full p-1 w-[180px] overflow-hidden z-20 mb-2">
          {/* Nền trượt */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute top-1 bottom-1 w-[85px] rounded-full bg-[#0d1b2a] z-[1]`}
            style={{
              left: mediaType === "movie" ? "4px" : "calc(100% - 89px)",
            }}
          />

          {/* Today */}
          <button
            onClick={() => setMediaType("movie")}
            className={`z-[2] flex-1 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
              mediaType === "movie" ? "text-[#60f0c2]" : "text-[#0d1b2a]"
            }`}
          >
            Movies
          </button>

          {/* This Week */}
          <button
            onClick={() => setMediaType("tv")}
            className={`z-[2] flex-1 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
              mediaType === "tv" ? "text-[#60f0c2]" : "text-[#0d1b2a]"
            }`}
          >
            TV Series
          </button>
        </div>
      </div>

      {mediaType === "movie" ? (
        <div>
          {isMoviesLoading ? (
            <div className="w-full h-[500px] flex justify-center items-center rounded-2xl bg-base-300 animate-pulse">
              Loading...
            </div>
          ) : isMoviesError ? (
            <div className="w-full h-[500px] flex justify-center items-center rounded-2xl bg-base-300">
              {moviesError.message}
            </div>
          ) : !movies ? (
            <div className="w-full h-[500px] flex justify-center items-center rounded-2xl bg-base-300">
              No Data
            </div>
          ) : (
            <div className="w-full h-[500px] rounded-2xl overflow-hidden">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                // Gán navigation sau khi Swiper khởi tạo (fix lỗi không click được)
                onBeforeInit={(swiper) => {
                  if (
                    swiper.params.navigation &&
                    typeof swiper.params.navigation !== "boolean"
                  ) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                className="w-full"
              >
                {movies?.results.map((movie) => (
                  <SwiperSlide key={movie.title}>
                    <div className="relative w-full h-[500px] group overflow-hidden rounded-2xl">
                      {/* Background image */}
                      <img
                        src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
                        alt={movie.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Play overlay button (hiện khi hover) */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                        <button className="w-16 h-16 rounded-full bg-gray-600/80 hover:bg-gray-400/80 border border-white/30 flex items-center justify-center backdrop-blur-sm transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            strokeWidth={0}
                            stroke="currentColor"
                            className="w-8 h-8 ml-1"
                          >
                            <path d="M5 3l14 9-14 9V3z" />
                          </svg>
                        </button>
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/70" />

                      {/* Text content */}
                      <div className="absolute bottom-0 left-0 p-10 max-w-2xl text-white transition-all duration-500 group-hover:translate-y-[-10px]">
                        {/* Title */}
                        <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">
                          {movie.title}
                        </h2>

                        <div className="flex justify-start items-center gap-2">
                          {/* Rating badge */}
                          <div
                            className={` w-[45px] h-[45px] rounded-full
                     flex items-center justify-center font-semibold text-sm
                     shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                     border-2 bg-black ${
                       movie.vote_average >= 7
                         ? "text-green-400 border-green-400"
                         : movie.vote_average >= 5
                         ? "text-yellow-400 border-yellow"
                         : "text-red-400 border-red"
                     } `}
                            aria-label={`rating ${movie.vote_average}`}
                          >
                            {roundUpToDecimal(movie.vote_average, 1)}
                          </div>

                          {/* Genres dưới dạng chip */}
                          <div className="flex flex-wrap gap-2">
                            {movie.genre_ids?.map((genre, index) => (
                              <Link
                                key={index}
                                href={`/genre/movie/${genre}-${movieGenresMap.get(
                                  genre
                                )}`}
                              >
                                <div className="px-3 py-1 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-full border border-white/20 backdrop-blur-sm transition">
                                  {movieGenresMap.get(genre)}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Overview */}
                        <p className="text-sm text-gray-200 mt-2 line-clamp-3">
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {/* Custom navigation buttons (ref được gán ở đây) */}
                <div
                  ref={prevRef}
                  className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-600/80 hover:bg-gray-400/80 flex items-center justify-center transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  ref={nextRef}
                  className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-600/80 hover:bg-gray-400/80 flex items-center justify-center transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Swiper>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isTVSeriesLoading ? (
            <div className="w-full h-[500px] flex justify-center items-center rounded-2xl bg-base-300 animate-pulse">
              Loading...
            </div>
          ) : isTVSeriesError ? (
            <div className="w-full h-[500px] flex justify-center items-center rounded-2xl bg-base-300">
              {tvSeriesError.message}
            </div>
          ) : !tvSeries || tvSeries?.results.length === 0 ? (
            <div className="w-full h-[500px] flex justify-center items-center rounded-2xl bg-base-300">
              No Data
            </div>
          ) : (
            <div className="w-full h-[500px] rounded-2xl overflow-hidden">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                // Gán navigation sau khi Swiper khởi tạo (fix lỗi không click được)
                onBeforeInit={(swiper) => {
                  if (
                    swiper.params.navigation &&
                    typeof swiper.params.navigation !== "boolean"
                  ) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                className="w-full"
              >
                {tvSeries?.results.map((tv) => (
                  <SwiperSlide key={tv.name}>
                    <div className="relative w-full h-[500px] group overflow-hidden rounded-2xl">
                      {/* Background image */}
                      <img
                        src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${tv.backdrop_path}`}
                        alt={tv.name}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Play overlay button (hiện khi hover) */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                        <button className="w-16 h-16 rounded-full bg-gray-600/80 hover:bg-gray-400/80 border border-white/30 flex items-center justify-center backdrop-blur-sm transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            strokeWidth={0}
                            stroke="currentColor"
                            className="w-8 h-8 ml-1"
                          >
                            <path d="M5 3l14 9-14 9V3z" />
                          </svg>
                        </button>
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/70" />

                      {/* Text content */}
                      <div className="absolute bottom-0 left-0 p-10 max-w-2xl text-white transition-all duration-500 group-hover:translate-y-[-10px]">
                        {/* Title */}
                        <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">
                          {tv.name}
                        </h2>

                        <div className="flex justify-start items-center gap-2">
                          {/* Rating badge */}
                          <div
                            className={` w-[45px] h-[45px] rounded-full
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

                          {/* Genres dưới dạng chip */}
                          <div className="flex flex-wrap gap-2">
                            {tv.genre_ids?.map((genre, index) => (
                              <Link
                                key={index}
                                href={`/genre/movie/${genre}-${tvGenresMap.get(
                                  genre
                                )}`}
                              >
                                <div className="px-3 py-1 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-full border border-white/20 backdrop-blur-sm transition">
                                  {tvGenresMap.get(genre)}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Overview */}
                        <p className="text-sm text-gray-200 mt-2 line-clamp-3">
                          {tv.overview}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {/* Custom navigation buttons (ref được gán ở đây) */}
                <div
                  ref={prevRef}
                  className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-600/80 hover:bg-gray-400/80 flex items-center justify-center transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  ref={nextRef}
                  className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-600/80 hover:bg-gray-400/80 flex items-center justify-center transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Swiper>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
