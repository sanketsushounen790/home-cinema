export const fetchTVSerieEpisodeGroups = async (tvId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tvId}/episode_groups`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv ${tvId} episode_groups`);
  }

  const data: TVEpisodeGroupsResult = await res.json();

  return data;
};

export default fetchTVSerieEpisodeGroups;
