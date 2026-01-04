const fetchCompanyDetailResult = async (companyId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/company/${companyId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch company ${companyId} detail`);
  }

  const data: DiscoverCompanyResult = await res.json();

  return data;
};

export default fetchCompanyDetailResult;
