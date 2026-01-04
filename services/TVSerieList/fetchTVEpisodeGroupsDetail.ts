const fetchTVEpisodeGroupsDetail = async (tv_episode_group_id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/episode_group/${tv_episode_group_id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch episode_group: ${tv_episode_group_id} detail`
    );
  }

  const data: TVEpisodeGroupsDetailResult = await res.json();

  return data;
};

export default fetchTVEpisodeGroupsDetail;
