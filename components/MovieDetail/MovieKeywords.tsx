"use client";

import fetchMovieKeywords from "@/services/MovieDetail/fetchMovieKeywords";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface MovieKeywords {
  movieId: number | string;
}

const MovieKeywords = ({ movieId }: MovieKeywords) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getMovieKeywords", movieId],
    queryFn: () => fetchMovieKeywords(movieId),
  });

  console.log(data);

  return (
    <div className="w-[90%] flex flex-col justify-start items-start gap-4 mb-1">
      <div className="w-full">
        <div className="w-full font-bold text-[20px]">Movie Tags</div>
      </div>
      <div className="flex flex-wrap justify-start items-center gap-2 text-black">
        {data?.keywords.map((keyword, index) => (
          <Link
            key={index}
            href={`/keyword/movie/${keyword.id}-${keyword.name}`}
          >
            <div className="w-auto h-auto p-1 rounded-sm border-[1px] cursor-pointer bg-gray-200 hover:bg-gray-300">
              {keyword.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieKeywords;
