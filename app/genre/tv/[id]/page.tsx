import GenreDiscover from "@/components/Genre/GenreDiscover";
import GenreDiscoverTV from "@/components/Genre/GenreDiscoverTV";

interface GenreDiscoverTVPageProps {
  params: {
    id: string;
  };
}

const GenreDiscoverTVPage = async ({ params }: GenreDiscoverTVPageProps) => {
  const { id } = await params;
  const genreId = id.split("-")[0];
  const genreName = id.split("-")[1];

  console.log("genreId", genreId);
  console.log("genreName", genreName);

  return <GenreDiscoverTV genreName={genreName} genreId={genreId} />;
};

export default GenreDiscoverTVPage;
