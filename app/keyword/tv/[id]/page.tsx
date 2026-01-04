import KeywordDiscoverTV from "@/components/Keyword/KeywordDiscoverTV";

interface KeywordDiscoverTVPageProps {
  params: {
    id: string;
  };
}

const KeywordDiscoverTVPage = async ({
  params,
}: KeywordDiscoverTVPageProps) => {
  const { id } = await params;
  const keywordId = id.split("-")[0];
  const keywordName = id.split("-")[1];

  console.log("keywordId", keywordId);
  console.log("keywordName", keywordName);

  return <KeywordDiscoverTV keywordName={keywordName} keywordId={keywordId} />;
};

export default KeywordDiscoverTVPage;
