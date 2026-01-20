const fetchAiringTodayTVSeries = async (
  language: string,
  page: number | string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/airing_today?language=${language}&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch airing today tv series");
  }

  const data: TVSerieResult = await res.json();

  return data;
};

export default fetchAiringTodayTVSeries;
