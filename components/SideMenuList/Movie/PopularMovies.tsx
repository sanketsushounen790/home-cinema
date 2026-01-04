"use client";

import LoadingCard from "@/components/Shared_Components/LoadingCard";
import { usePopularMovies } from "./hook/usePopularMovies";
import MovieCard from "@/components/Movie/MovieCard";

const PopularMovies = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePopularMovies();

  const movieArraylength: number = data?.pages[0]?.results.length as number;

  return (
    <div className="w-full h-auto mb-8">
      <div className="flex flex-wrap justify-start items-center ml-7 mt-2 mb-3 gap-3">
        <div className="font-bold text-[23px]">Popular Movies</div>
      </div>

      {isLoading ? (
        <div
          className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-6 justify-center`}
        >
          {Array.from({ length: 20 }, (_, index) => index).map(
            (item, index) => (
              <div key={item} className="w-full">
                <LoadingCard />
              </div>
            )
          )}
        </div>
      ) : movieArraylength <= 5 ? (
        <div
          className={`w-[90%] flex flex-wrap justify-center lg:justify-start gap-6 mx-6`}
        >
          {data?.pages.map((page) =>
            page.results.map((result, index) => (
              <div key={index} className="w-[200px]">
                <MovieCard movie={result} />
              </div>
            ))
          )}
        </div>
      ) : (
        <div
          className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-6 justify-center`}
        >
          {data?.pages.map((page) =>
            page.results.map((result, index) => (
              <div key={index} className="w-full w-max-[200px]">
                <MovieCard movie={result} />
              </div>
            ))
          )}

          {hasNextPage && movieArraylength >= 20 && (
            <div className="w-full h-[300px] flex items-center justify-center rounded-lg shadow-lg bg-base-300">
              <button
                key={`loadmore-button`}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
              >
                {isFetchingNextPage ? "Đang tải..." : "Xem thêm"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PopularMovies;
