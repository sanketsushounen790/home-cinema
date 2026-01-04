const fetchEpisodeCredits = async (
  tvId: string | number,
  seasonNumber: string | number,
  episodeNumber: string | number
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/credits`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv ${tvId} episode credits`);
  }

  const data: EpisodeCreditsResult = await res.json();

  return data;
};

export default fetchEpisodeCredits;
