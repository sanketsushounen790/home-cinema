const fetchMovieVideos = async (movieId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movieId}/videos`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch movie ${movieId} videos`);
  }

  const data: MovieVideosResult = await res.json();

  return data;
};

export default fetchMovieVideos;
