const fetchNowPlayingMovies = async (
  language: string,
  page: number | string,
  region: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/now_playing?language=${language}&page=${page}&region=${region}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch now playing movies");
  }

  const data: MovieResult = await res.json();

  return data;

  // const data: MovieResult = await res.json();

  // return {
  //   results: data.results ?? [],
  //   page: data?.page,
  //   total_pages: data.total_pages,
  // };
};

export default fetchNowPlayingMovies;
