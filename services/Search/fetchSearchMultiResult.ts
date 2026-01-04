const fetchSearchMultiResult = async (
  query: string | number,
  include_adult: boolean,
  language: string,
  page: number
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/multi?query=${query}&include_adult=${include_adult}&language=${language}&page=${page}`,
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
      `Failed to fetch search result for multi search with query: "${query}"`
    );
  }

  const data: SearchMultiResult = await res.json();

  return data;
};

export default fetchSearchMultiResult;
