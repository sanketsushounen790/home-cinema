export const fetchDiscoverMoviesSearch = async (
  genres: string[],
  exclude_genres: string[],
  keywords: string[],
  origin_country: string,
  original_language: string,
  include_adult: boolean,
  include_video: boolean,
  run_time_gte: string,
  run_time_lte: string,
  vote_average_gte: number | null,
  vote_average_lte: number | null,
  vote_count_gte: number | null,
  vote_count_lte: number | null,
  primary_release_date_gte: string,
  primary_release_date_lte: string,
  release_date_gte: string,
  release_date_lte: string,
  release_type: string[],
  sort_by: DiscoverMovieSortBy,
  language: string,
  region: string,
  page: string
) => {
  const baseParams: Record<string, string> = {
    include_adult: include_adult ? "true" : "false",
    include_video: include_video ? "true" : "false",
    language: language || "en-US",
    page: page || "1",
    sort_by: sort_by, // Ưu tiên để chung 1 chỗ luôn
  };

  // OPTIONAL PARAMS
  const optionalParams: Record<string, string> = {
    ...(genres.length > 0 && { with_genres: genres.join(",") }),
    ...(exclude_genres.length > 0 && {
      without_genres: exclude_genres.join(","),
    }),
    ...(keywords.length > 0 && { with_keywords: keywords.join(",") }),
    ...(origin_country && { with_origin_country: origin_country }),
    ...(original_language && { with_original_language: original_language }),
    ...(region && { region }),

    ...(typeof vote_average_gte === "number" && {
      "vote_average.gte": String(vote_average_gte),
    }),
    ...(typeof vote_average_lte === "number" && {
      "vote_average.lte": String(vote_average_lte),
    }),
    ...(typeof vote_count_gte === "number" && {
      "vote_count.gte": String(vote_count_gte),
    }),
    ...(typeof vote_count_lte === "number" && {
      "vote_count.lte": String(vote_count_lte),
    }),

    ...(run_time_gte && { "with_runtime.gte": run_time_gte }),
    ...(run_time_lte && { "with_runtime.lte": run_time_lte }),
    ...(primary_release_date_gte && {
      "primary_release_date.gte": primary_release_date_gte,
    }),
    ...(primary_release_date_lte && {
      "primary_release_date.lte": primary_release_date_lte,
    }),

    ...(release_date_gte && { "release_date.gte": release_date_gte }),
    ...(release_date_lte && { "release_date.lte": release_date_lte }),
    ...(release_date_gte &&
      release_date_lte &&
      release_type.length > 0 && {
        with_release_type: release_type.join("|"),
      }),
  };

  // GỘP LẠI THÀNH 1 OBJECT
  const allParams = {
    ...baseParams,
    ...optionalParams,
  };

  const queryString = new URLSearchParams(allParams).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?${queryString}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch discover movie search`);
  }

  const data: DiscoverMovieResult = await res.json();

  return data;
};

export const fetchDiscoverMoviesByGenre = async (
  genreId: string,
  genreName: string,
  page: string,
  language: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=popularity.desc&with_genres=${genreId}-${genreName}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch discover movie with genre ${genreName}`);
  }

  const data: DiscoverMovieResult = await res.json();

  return data;
};

export const fetchDiscoverMoviesByKeyword = async (
  keywordId: string,
  keyword: string,
  page: string,
  language: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=popularity.desc&with_keywords=${keywordId}-${keyword}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch discover movie with genre ${keyword} for movie ${keywordId}`
    );
  }

  const data: DiscoverMovieResult = await res.json();

  return data;
};

export const fetchDiscoverMoviesByNetwork = async (
  networkId: string,
  networkName: string,
  page: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_networks=${networkId}-${networkName}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch discover TV with network ${networkName}- ID: ${networkId}`
    );
  }

  const data: DiscoverMovieResult = await res.json();

  return data;
};

export const fetchDiscoverMoviesByCompany = async (
  companyId: string,
  companyName: string,
  page: string,
  language: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=popularity.desc&with_companies=${companyId}-${companyName}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch discover TV with company ${companyName}- ID: ${companyId}`
    );
  }

  const data: DiscoverMovieResult = await res.json();

  return data;
};
