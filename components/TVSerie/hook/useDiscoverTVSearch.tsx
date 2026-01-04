"use client";

import { fetchDiscoverMoviesSearch } from "@/services/Search/fetchDiscoverMovies";
import { fetchDiscoverTVSearch } from "@/services/Search/fetchDiscoverTV";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface DiscoverParams {
  params: {
    genres: string[];
    exclude_genres: string[];
    keywords: string[];
    origin_country: string;
    original_language: string;
    include_adult: boolean;
    include_null_first_air_dates: boolean;
    first_air_date_gte: string;
    first_air_date_lte: string;
    vote_average_gte: number | null;
    vote_average_lte: number | null;
    vote_count_gte: number | null;
    vote_count_lte: number | null;
    sort_by: DiscoverTVSortBy;
    language: string;
    page: string;
  };
}

export function useDiscoverTVSearch({ params }: DiscoverParams) {
  const [enabled, setEnabled] = useState(true); // lần đầu fetch tự động
  const [stableData, setStableData] = useState<
    InfiniteData<DiscoverTVResult> | undefined
  >();

  const query = useInfiniteQuery({
    queryKey: [
      "getDiscoverTVSearch",
      params.genres,
      params.exclude_genres,
      params.keywords,
      params.origin_country,
      params.original_language,
      params.include_adult,
      params.include_null_first_air_dates,
      params.first_air_date_gte,
      params.first_air_date_lte,
      params.vote_average_gte,
      params.vote_average_lte,
      params.vote_count_gte,
      params.vote_count_lte,

      params.sort_by,
      params.language,

      params.page,
    ],

    queryFn: async ({ pageParam = 1 }) => {
      return await fetchDiscoverTVSearch(
        params.genres,
        params.exclude_genres,
        params.keywords,
        params.origin_country,
        params.original_language,
        params.include_adult,
        params.include_null_first_air_dates,
        params.first_air_date_gte,
        params.first_air_date_lte,
        params.vote_average_gte,
        params.vote_average_lte,
        params.vote_count_gte,
        params.vote_count_lte,

        params.sort_by,
        params.language,

        String(pageParam)
      );
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },

    initialPageParam: 1,
    enabled, // lần đầu fetch tự động
  });

  // Lần đầu fetch xong → tắt auto fetch
  useEffect(() => {
    if (enabled) setEnabled(false);
  }, [enabled]);

  // Khi query có data mới → update stableData
  useEffect(() => {
    if (query.data) {
      setStableData(query.data);
    }
  }, [query.data]);

  // Trigger fetch khi click Search
  const search = async () => {
    await query.refetch();
  };

  return { ...query, search, stableData };
}
