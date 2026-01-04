const fetchTVSerieDetail = async (language: string, tvId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tvId}?append_to_response=credits&language=${language}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
      cache: "force-cache", // chỉ dùng cached nếu có
      //next: { revalidate: 300000 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv ${tvId} detail data`);
  }

  const data: TVSerieDetailResult = await res.json();

  return data;
};

export default fetchTVSerieDetail;
