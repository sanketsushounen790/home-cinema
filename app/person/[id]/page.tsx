import PersonDetail from "@/components/Person/PersonDetail";
import TComponent from "@/components/Person/TComponent";

interface PersonDetailPageProps {
  params: {
    id: string;
  };
}

const PersonDetailPage = async ({ params }: PersonDetailPageProps) => {
  const { id } = await params;

  return <PersonDetail id={id} />;
};

export default PersonDetailPage;
