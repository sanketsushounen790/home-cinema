const fetchMovieCredits = async (
  language: string,
  movieId: string | number
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movieId}/credits?language=${language}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch movie ${movieId} credits`);
  }

  const data: MovieCreditsResult = await res.json();

  return data;
};

export default fetchMovieCredits;
