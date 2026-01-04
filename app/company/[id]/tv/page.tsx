import DiscoverTVCompany from "@/components/Company/DiscoverTVCompany";
import fetchCompanyDetailResult from "@/services/Company/fetchCompanyDetailResult";

interface CompanyPageProps {
  params: {
    id: string;
  };
}

const CompanyPage = async ({ params }: CompanyPageProps) => {
  const { id } = await params;
  const companyId = id.split("-")[0];
  const companyName = id.split("-")[1];
  const type = id.split("-")[2];
  const companyDetail = await fetchCompanyDetailResult(companyId);

  return (
    <DiscoverTVCompany
      companyId={companyId}
      companyName={companyName}
      companyDetail={companyDetail}
      type={type}
    />
  );
};

export default CompanyPage;
