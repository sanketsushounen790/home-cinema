const fetchPopularPeople = async (language: string, page: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/person/popular?language=${language}&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch popular people`);
  }

  const data: PopularPeopleResult = await res.json();

  return data;
};

export default fetchPopularPeople;
