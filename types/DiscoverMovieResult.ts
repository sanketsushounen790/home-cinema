interface DiscoverMovieResultsItem {
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
}
interface DiscoverMovieResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: DiscoverMovieResultsItem[];
}
type DiscoverMovieSortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "title.asc"
  | "title.desc"
  | "vote_average.asc"
  | "vote_average.desc";

type DiscoverMovieReleaseTypes = "1" | "2" | "3" | "4" | "5";
