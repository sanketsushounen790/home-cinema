const fetchTrendingMovies = async (
  language: string,
  page: number | string,
  time_window: "day" | "week"
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/trending/movie/${time_window}?language=${language}&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch trending movies in ${time_window}`);
  }

  const data: TrendingMovieResult = await res.json();

  return data;
};

export default fetchTrendingMovies;
