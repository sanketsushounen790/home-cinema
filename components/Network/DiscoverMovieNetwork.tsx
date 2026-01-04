"use client";

import LoadingCard from "../Shared_Components/LoadingCard";
import { useDiscoverMovieByNetwork } from "./hook/useDiscoverMovieByNetwork";

import { Building2 } from "lucide-react";
import { MapPin } from "lucide-react";
import { Globe } from "lucide-react";
import { Link } from "lucide-react";
import MovieCard from "../Movie/MovieCard";

interface DiscoverMovieNetworkProps {
  networkName: string;
  networkId: string;
  networkDetail: NetworkDetailResult;
  type: string;
}

const DiscoverMovieNetwork = ({
  networkName,
  networkId,
  networkDetail,
  type,
}: DiscoverMovieNetworkProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useDiscoverMovieByNetwork(networkId, networkName);

  console.log(networkDetail);

  return (
    <div className="w-full h-auto">
      <div className="flex justify-start items-end ml-7 gap-5 mb-6 mt-3">
        <div className="w-auto h-auto flex flex-col justify-start items-center gap-4 p-2 font-bold text-[20px] text-black bg-white shadow-lg">
          <img
            src={`https://media.themoviedb.org/t/p/h60${networkDetail.logo_path}`}
            alt={networkDetail.name}
          />
        </div>

        <div className="w-full flex justify-start items-center gap-5">
          {networkDetail.name && (
            <div className="flex justify-center items-center gap-2">
              <Building2 size={18} strokeWidth={2.5} />
              <p>{networkDetail.name}</p>
            </div>
          )}

          {networkDetail.origin_country && (
            <div className="flex justify-center items-center gap-2">
              <Globe size={18} strokeWidth={2.5} />

              <img
                src={`https://flagcdn.com/w320/${networkDetail.origin_country.toLowerCase()}.png`}
                alt={networkDetail.origin_country}
                className="w-5 h-4 rounded border"
              />
              <p>({networkDetail.origin_country})</p>
            </div>
          )}

          {networkDetail.headquarters && (
            <div className="flex justify-center items-center gap-2">
              <MapPin size={18} strokeWidth={2.5} />

              <p>{networkDetail.headquarters}</p>
            </div>
          )}

          {networkDetail.homepage && (
            <div className="flex justify-center items-center gap-2">
              <Link size={18} strokeWidth={2.5} />
              <a
                href={networkDetail.homepage}
                target="_blank"
                className="hover:underline"
              >
                Homepage
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-start items-end ml-7 gap-5 mb-3 mt-3">
        {type === "tv" ? (
          <div className="font-bold text-[23px]">
            {data?.pages[0].total_results} Shows
          </div>
        ) : (
          <div className="font-bold text-[23px]">
            {data?.pages[0].total_results} Movies
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-6 mx-6">
          {Array.from({ length: 20 }, (_, index) => index).map(
            (item, index) => (
              <div key={item}>
                <LoadingCard />
              </div>
            )
          )}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-6 mx-6">
          {data?.pages.map((page) =>
            page.results.map((result, index) => (
              <div key={index}>
                <MovieCard movie={result} />
              </div>
            ))
          )}

          {hasNextPage && (
            <div className="w-full h-[300px] flex items-center justify-center rounded-lg shadow-lg bg-gray-200">
              <button
                key={`loadmore-button`}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
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

export default DiscoverMovieNetwork;
