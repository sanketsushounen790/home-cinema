import GenreDiscover from "@/components/Genre/GenreDiscover";

interface GenreDiscoverPageProps {
  params: {
    id: string;
  };
}

const GenreDiscoverPage = async ({ params }: GenreDiscoverPageProps) => {
  const { id } = await params;
  const genreId = id.split("-")[0];
  const genreName = id.split("-")[1];

  console.log("genreId", genreId);
  console.log("genreName", genreName);

  return <GenreDiscover genreName={genreName} genreId={genreId} />;
};

export default GenreDiscoverPage;
