interface SearchPersonResultKnownFor {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface SearchPersonResult {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: SearchPersonResultKnownFor[];
}

interface SearchMovieResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface SearchTVResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

interface SearchMultiResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: (SearchMovieResult | SearchPersonResult | SearchTVResult)[];
}
