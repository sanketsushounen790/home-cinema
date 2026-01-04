const fetchNetworkDetailResult = async (networkId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/network/${networkId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch network ${networkId} detail`);
  }

  const data: NetworkDetailResult = await res.json();

  return data;
};

export default fetchNetworkDetailResult;
