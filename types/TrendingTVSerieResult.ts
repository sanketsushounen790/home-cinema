interface TrendingTVSerie {
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

interface TrendingTVSerieResult {
  pages: number;
  results: TrendingTVSerie[];
  total_pages: number;
  total_results: number;
}
