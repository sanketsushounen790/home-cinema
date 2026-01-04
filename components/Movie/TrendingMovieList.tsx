"use client";

import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import fetchTrendingMovies from "@/services/MovieList/fetchTrendingMovies";
import LoadingCard from "../Shared_Components/LoadingCard";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";

interface TrendingMovieListProps {
  timeWindow: "day" | "week";
}

const TrendingMovieList: React.FC<TrendingMovieListProps> = ({
  timeWindow,
}) => {
  const { language } = useLanguageStore();

  const { isLoading, error, data } = useQuery({
    queryKey: ["getTrendingMovieList", language, timeWindow],
    queryFn: () => fetchTrendingMovies(language, 1, timeWindow),
    staleTime: Infinity,
  });

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center">
      <div className="w-full max-w-auto h-[410px] px-6 py-5 flex justify-start items-start gap-7 overflow-x-scroll z-10 touch-pan-x scroll-smooth">
        {isLoading ? (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-[200px] h-[300px] flex-shrink-0 rounded-lg bg-base-300"
              >
                <LoadingCard />
              </div>
            ))}
          </>
        ) : (
          <>
            {data?.results.map((movie, index) => (
              <div
                key={index}
                className="w-[200px] h-[300px] flex-shrink-0 rounded-lg bg-base-300"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
            <div className="w-[200px] h-[300px] flex-shrink-0 flex items-center justify-center rounded-lg shadow-lg bg-base-300">
              <Link href={`/movie/trending`}>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer">
                  Xem thêm
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrendingMovieList;
