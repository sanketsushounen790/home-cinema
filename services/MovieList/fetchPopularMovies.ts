const fetchPopularMovies = async (language: string, page: number | string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular?language=${language}&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data: MovieResult = await res.json();

  return data;
};

export default fetchPopularMovies;
