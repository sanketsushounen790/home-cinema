interface TVSerieCreated {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

interface TVSerieGenre {
  id: number;
  name: string;
}

interface TVSerieLastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface TVSerieNetWork {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface TVSerieProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface TVSerieProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface TVSerieSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface TVSerieSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface TVSerieCastCredit {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

interface TVSerieCrewCredit {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

interface TVSerieDetailResult {
  adult: boolean;
  backdrop_path: string;
  created_by: TVSerieCreated[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TVSerieGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TVSerieLastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: TVSerieNetWork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TVSerieProductionCompany[];
  production_countries: TVSerieProductionCountry[];
  seasons: TVSerieSeason[];
  spoken_languages: TVSerieSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: TVSerieCastCredit[];
    crew: TVSerieCrewCredit[];
  };
}
