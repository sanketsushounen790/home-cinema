"use client";

import { EpisodeItem } from "./EpisodeItem";

interface EpisodeListProps {
  episodes: SeasonDetailEpisode[];
  tvId: string | number;
}

export default function EpisodeList({ episodes, tvId }: EpisodeListProps) {
  const today = new Date().getTime();

  return (
    <div className="w-[80%] flex flex-col gap-6">
      {episodes
        .filter(
          (ep) =>
            ep.air_date !== null && new Date(ep.air_date).getTime() <= today
        )
        .map((ep, index) => (
          <EpisodeItem key={index} epIndex={index} ep={ep} tvId={tvId} />
        ))}
    </div>
  );
}
