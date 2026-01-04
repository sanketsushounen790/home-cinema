interface TVEpisodeGroup {
  description: string;
  episode_count: number;
  group_count: number;
  id: string;
  name: string;
  network: null | {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  };
  type: number;
}
interface TVEpisodeGroupsResult {
  results: TVEpisodeGroup[];
  id: number;
}
