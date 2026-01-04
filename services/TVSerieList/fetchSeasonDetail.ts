const fetchSeasonDetail = async (
  tvId: string | number,
  seasonNumber: string | number,
  language: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tvId}/season/${seasonNumber}?language=${language}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv ${tvId} season detail`);
  }

  const data: SeasonDetailResult = await res.json();

  return data;
};

export default fetchSeasonDetail;
