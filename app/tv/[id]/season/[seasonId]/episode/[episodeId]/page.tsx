import EpisodeWatchPage from "@/components/TVSerie/EpisodeWatchPage";
import fetchEpisodeCredits from "@/services/TVSerieList/fetchEpisodeCredits";
import fetchSeasonDetail from "@/services/TVSerieList/fetchSeasonDetail";

interface EpisodeDetailPagePageProps {
  params: {
    id: string;
    seasonId: string;
    episodeId: string;
  };
  searchParams?: Promise<{
    comment?: string;
  }>;
}

const EpisodeDetailPage = async ({
  params,
  searchParams,
}: EpisodeDetailPagePageProps) => {
  const { id, seasonId, episodeId } = await params;

  let focusCommentId: string | undefined;
  let rootCommentId: string | undefined;

  if (searchParams) {
    const { comment } = await searchParams;

    if (comment) {
      const [commentId, replyId] = comment.split("_");
      focusCommentId = replyId;
      rootCommentId = commentId;
    }
  }

  const parts = episodeId.split("_");
  const epId = parts[0];
  const epIndex = parts[1];

  const credits = await fetchEpisodeCredits(id, seasonId, epId);

  return (
    <EpisodeWatchPage
      credits={credits}
      tvId={id}
      focusCommentId={focusCommentId}
      rootCommentId={rootCommentId}
      seasondId={seasonId}
      episodeId={epId}
      episodeIndex={Number(epIndex)}
    />
  );
};

export default EpisodeDetailPage;
