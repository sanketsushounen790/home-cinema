const fetchTVSerieContentRatings = async (tvId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tvId}/content_ratings`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv ${tvId} content_ratings`);
  }

  const data: TVSerieContentRatingsResult = await res.json();

  return data;
};

export default fetchTVSerieContentRatings;
