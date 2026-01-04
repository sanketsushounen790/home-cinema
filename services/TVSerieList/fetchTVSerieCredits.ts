const fetchTVSerieCredits = async (language: string, tvId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tvId}/credits?language=${language}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv ${tvId} credits`);
  }

  const data: MovieCreditsResult = await res.json();

  return data;
};

export default fetchTVSerieCredits;
