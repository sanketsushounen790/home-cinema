const fetchTVSerieSimilars = async (
  language: string,
  tvId: string | number,
  page: number | string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tvId}/similar?language=${language}&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv ${tvId} similar`);
  }

  const data: TVSerieResult = await res.json();

  return data;
};

export default fetchTVSerieSimilars;
