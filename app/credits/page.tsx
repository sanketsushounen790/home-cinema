import MovieCredits from "@/components/Movie/MovieCredits";

interface CreditsPageProps {
  params: {
    id: string;
  };
}

const CreditsPage = async ({ params }: CreditsPageProps) => {
  const { id } = await params;

  return <MovieCredits />;
};

export default CreditsPage;
