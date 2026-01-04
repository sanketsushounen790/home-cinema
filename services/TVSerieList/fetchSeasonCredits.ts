const fetchSeasonCredits = async (
  language: string,
  tvId: string | number,
  seasonNumber: string | number
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tvId}/season/${seasonNumber}/credits?language=${language}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv ${tvId} season credits`);
  }

  const data: SeasonCreditsResult = await res.json();

  return data;
};

export default fetchSeasonCredits;
