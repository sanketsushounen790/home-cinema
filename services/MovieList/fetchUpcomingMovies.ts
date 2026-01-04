const fetchUpcomingMovies = async (
  language: string,
  page: number | string,
  region: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/upcoming?language=${language}&page=${page}&region=${region}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch upcoming movies");
  }

  const data: MovieResult = await res.json();

  return data;
};

export default fetchUpcomingMovies;
