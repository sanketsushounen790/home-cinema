import KeywordDiscover from "@/components/Keyword/KeywordDiscover";

interface KeywordDiscoverPageProps {
  params: {
    id: string;
  };
}

const KeywordDiscoverPage = async ({ params }: KeywordDiscoverPageProps) => {
  const { id } = await params;
  const keywordId = id.split("-")[0];
  const keywordName = id.split("-")[1];

  console.log("keywordId", keywordId);
  console.log("keywordName", keywordName);

  return <KeywordDiscover keywordName={keywordName} keywordId={keywordId} />;
};

export default KeywordDiscoverPage;
