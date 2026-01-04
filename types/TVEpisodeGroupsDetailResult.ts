interface TVEpisodeGroupsDetailEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: null | number;
  season_number: string;
  show_id: string;
  still_path: string;
  vote_average: number;
  vote_count: number;
  order: number;
}

interface TVEpisodeGroupsDetailGroup {
  id: string;
  name: string;
  order: number;
  episodes: TVEpisodeGroupsDetailEpisode[];
  locked: boolean;
}

interface TVEpisodeGroupsDetailResult {
  description: string;
  episode_count: number;
  group_count: number;
  groups: TVEpisodeGroupsDetailGroup[];
  id: string;
  name: string;
  network: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  };
  type: number;
}
