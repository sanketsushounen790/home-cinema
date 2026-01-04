"use client";

import { fetchDiscoverMoviesSearch } from "@/services/Search/fetchDiscoverMovies";
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
    include_video: boolean;
    run_time_gte: string;
    run_time_lte: string;
    vote_average_gte: number | null;
    vote_average_lte: number | null;
    vote_count_gte: number | null;
    vote_count_lte: number | null;
    primary_release_date_gte: string;
    primary_release_date_lte: string;
    release_date_gte: string;
    release_date_lte: string;
    release_type: string[];
    sort_by: DiscoverMovieSortBy;
    language: string;
    region: string;
    page: string;
  };
}

export function useDiscoverMovieSearch({ params }: DiscoverParams) {
  const [enabled, setEnabled] = useState(true); // lần đầu fetch tự động
  const [stableData, setStableData] = useState<
    InfiniteData<DiscoverMovieResult> | undefined
  >();

  const query = useInfiniteQuery({
    queryKey: [
      "getDiscoverMovieSearch",
      params.genres,
      params.exclude_genres,
      params.keywords,
      params.origin_country,
      params.original_language,
      params.include_adult,
      params.include_video,
      params.run_time_gte,
      params.run_time_lte,
      params.vote_average_gte,
      params.vote_average_lte,
      params.vote_count_gte,
      params.vote_count_lte,
      params.primary_release_date_gte,
      params.primary_release_date_lte,
      params.release_date_gte,
      params.release_date_lte,
      params.release_type,
      params.sort_by,
      params.language,
      params.region,
      params.page,
    ],

    queryFn: async ({ pageParam = 1 }) => {
      return await fetchDiscoverMoviesSearch(
        params.genres,
        params.exclude_genres,
        params.keywords,
        params.origin_country,
        params.original_language,
        params.include_adult,
        params.include_video,
        params.run_time_gte,
        params.run_time_lte,
        params.vote_average_gte,
        params.vote_average_lte,
        params.vote_count_gte,
        params.vote_count_lte,
        params.primary_release_date_gte,
        params.primary_release_date_lte,
        params.release_date_gte,
        params.release_date_lte,
        params.release_type,
        params.sort_by,
        params.language,
        params.region,
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
