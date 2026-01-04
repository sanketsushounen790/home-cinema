const fetchPersonExternalIds = async (personId: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/person/${personId}/external_ids`,
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

  const data: PersonExternalIds = await res.json();

  return data;
};

export default fetchPersonExternalIds;
