interface DiscoverTVResultsItem {
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
}

interface DiscoverTVResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: DiscoverTVResultsItem[];
}

type DiscoverTVSortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "title.asc"
  | "title.desc"
  | "vote_average.asc"
  | "vote_average.desc";
