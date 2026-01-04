const fetchMovieDetail = async (language: string, movieId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movieId}?append_to_response=credits&language=${language}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch movie ${movieId} detail data`);
  }

  const data: MovieDetailResult = await res.json();

  return data;
};

export default fetchMovieDetail;
