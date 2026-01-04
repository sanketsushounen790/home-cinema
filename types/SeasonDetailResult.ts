interface SeasonDetailNetwork {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface SeasonDetailEpisodeCrew {
  job: string;
  department: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface SeasonDetailEpisodeGuestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface SeasonDetailEpisode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: SeasonDetailEpisodeCrew[];
  guest_stars: SeasonDetailEpisodeGuestStar[];
}

interface SeasonDetailResult {
  _id: string;
  air_date: string;
  episodes: SeasonDetailEpisode[];
  name: string;
  networks: SeasonDetailNetwork[];
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
