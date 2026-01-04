interface MovieDetailGenres {
  id: number;
  name: string;
}

interface MovieDetailProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface MovieDetailProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface MovieDetailSpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface MovieDetailCredits {
  crew: MovieCreditsCrew[];
  cast: MovieCreditsCast[];
}

interface MovieDetailResult {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string | null;
  budget: number;
  genres: MovieDetailGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MovieDetailProductionCompany[];
  production_countries: MovieDetailProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: MovieDetailSpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: MovieDetailCredits;
}
