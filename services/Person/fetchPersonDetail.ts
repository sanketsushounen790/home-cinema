const fetchPersonDetail = async (
  language: string,
  personId: string | number
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/person/${personId}?append_to_response=combined_credits&language=${language}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch person ${personId} detail`);
  }

  const data: PersonDetailResult = await res.json();

  return data;
};

export default fetchPersonDetail;
