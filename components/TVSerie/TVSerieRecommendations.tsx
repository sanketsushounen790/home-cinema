"use client";

import { useQuery } from "@tanstack/react-query";
import LoadingCard from "../Shared_Components/LoadingCard";
import fetchTVSerieRecommendations from "@/services/TVSerieList/fetchTVSerieRecommendations";
import TVSerieCard from "./TVSerieCard";
import Link from "next/link";

interface TVSerieRecommendationsProps {
  tvId: string | number;
  tvName: string;
}

export const TVSerieRecommendations = ({
  tvId,
  tvName,
}: TVSerieRecommendationsProps) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getTVSerieRecommendations", tvId],
    queryFn: () => fetchTVSerieRecommendations("en-US", tvId, 1),
    staleTime: Infinity,
  });

  console.log(data);

  return (
    <div className="w-[90%] h-auto flex flex-col justify-start items-center">
      {isLoading ? (
        <>
          <div className="w-full">
            <div className="w-full font-bold text-[20px]">Recommendations</div>
          </div>

          <div className="w-full max-w-auto h-[410px] px-6 py-5 flex justify-start items-start gap-7 overflow-x-scroll touch-pan-x scroll-smooth">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-[200px] h-[300px] flex-shrink-0 rounded-lg bg-base-300"
              >
                <LoadingCard />
              </div>
            ))}
          </div>
        </>
      ) : (
        data?.results.length !== 0 && (
          <>
            <div className="w-full">
              <div className="w-full font-bold text-[20px]">
                Recommendations
              </div>
            </div>

            <div className="w-full max-w-auto h-[410px] px-6 py-5 flex justify-start items-start gap-7 overflow-x-scroll touch-pan-x scroll-smooth">
              {data?.results.map((tv, index) => (
                <div
                  key={index}
                  className="w-[200px] h-[300px] flex-shrink-0 rounded-lg bg-base-300"
                >
                  <TVSerieCard tv={tv} />
                </div>
              ))}

              <div className="w-[200px] h-[300px] flex-shrink-0 flex items-center justify-center rounded-lg shadow-lg bg-base-300">
                <Link href={`/tv/${tvId}-${tvName}/recommendations`}>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer">
                    Xem thêm
                  </button>
                </Link>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};
