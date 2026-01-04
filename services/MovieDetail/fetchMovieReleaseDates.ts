const fetchMovieReleaseDates = async (movieId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movieId}/release_dates`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch movie ${movieId} release_dates`);
  }

  const data: MovieReleaseDatesResult = await res.json();

  return data;
};

export default fetchMovieReleaseDates;
