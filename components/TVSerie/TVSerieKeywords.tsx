"use client";

import fetchTVSerieKeywords from "@/services/TVSerieList/fetchTVSerieKeywords";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface TVSerieKeywordsProps {
  tvId: number | string;
}

const TVSerieKeywords = ({ tvId }: TVSerieKeywordsProps) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getTVSerieKeywords", tvId],
    queryFn: () => fetchTVSerieKeywords(tvId),
  });

  console.log(data);

  return (
    <div className="w-[90%] flex flex-wrap justify-start items-center gap-2 text-black">
      {data &&
        data?.results.map((keyword, index) => (
          <Link key={index} href={`/keyword/tv/${keyword.id}-${keyword.name}`}>
            <div className="w-auto h-auto p-1 rounded-sm border-[1px] cursor-pointer bg-gray-200 hover:bg-gray-300">
              {keyword.name}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default TVSerieKeywords;
