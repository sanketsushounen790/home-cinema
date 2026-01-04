interface PersonCastCreditTV {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  episode_count: number;
  first_credit_air_date: string;
}

interface PersonCastCreditMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
}

interface PersonCrewCreditTV {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  episode_count: number;
  first_credit_air_date: string;
  job: string;
}

interface PersonCrewCreditMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  media_type: string;
}

type MovieCrewCredit = Omit<PersonCrewCreditMovie, "job" | "episode_count"> & {
  job: string[];
  episode_count: number[];
};

type TvCrewCredit = Omit<PersonCrewCreditTV, "job" | "episode_count"> & {
  job: string[];
  episode_count: number[];
};

type CastCredit = PersonCastCreditMovie | PersonCastCreditTV;
type CrewCredit = PersonCrewCreditMovie | PersonCrewCreditTV;
type PersonCredit =
  | PersonCastCreditMovie
  | PersonCastCreditTV
  | PersonCrewCreditMovie
  | PersonCrewCreditTV;

type GroupedCredits = {
  label: string; // "Acting" hoặc "Other"
  credits: (CastCredit | CrewCredit)[];
};

interface PersonCombinedCredits {
  cast: CastCredit[];
  crew: CrewCredit[];
}

interface PersonDetailResult {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: null | string;
  gender: number;
  homepage: null | string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  combined_credits: PersonCombinedCredits;
}
