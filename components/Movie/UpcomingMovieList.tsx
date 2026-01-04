"use client";

import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import LoadingCard from "../Shared_Components/LoadingCard";
import fetchUpcomingMovies from "@/services/MovieList/fetchUpcomingMovies";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRegionStore } from "@/store/useRegionStore";

const UpcomingMovieList = () => {
  const { language } = useLanguageStore();
  const { region } = useRegionStore();

  const { isLoading, error, data } = useQuery({
    queryKey: ["getUpcomingMovieList", language, region],
    queryFn: () => fetchUpcomingMovies(language, 1, region),
    staleTime: Infinity,
  });

  console.log(data);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full max-w-auto min-h-[410px] px-6 py-5 flex gap-7 overflow-x-scroll z-[10] touch-pan-x scroll-smooth">
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
        ) : !data || data.results.length === 0 ? (
          <div className="w-[200px] h-[300px] flex-shrink-0 flex items-center justify-center rounded-lg shadow-lg bg-base-300">
            No Data
          </div>
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
              <Link href={`/movie/upcoming`}>
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

export default UpcomingMovieList;
