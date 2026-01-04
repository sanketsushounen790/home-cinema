const fetchMovieSimilars = async (
  language: string,
  movieId: string | number,
  page: number | string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movieId}/similar?language=${language}&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch movie ${movieId} similar`);
  }

  const data: MovieResult = await res.json();

  return data;
};

export default fetchMovieSimilars;
