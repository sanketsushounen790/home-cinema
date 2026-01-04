interface ItemIndex {
  itemId: string;
  watchlistIds: string[];
  media_type: "movie" | "tv";
  updatedAt: number;
}

interface WatchlistAllFromFB {
  id: string;
  title: string;
  createdAt: number;
  updatedAt?: number;
  items: WatchlistItem[];
}

interface Watchlist {
  id: string; // auto id từ firestore
  title: string; // tên watchlist
  createdAt: number; // timestamp
}

interface WatchlistsSummarySelected {
  list: WatchlistSummary[];
  map: Record<string, WatchlistSummary>;
}

interface WatchlistSummary {
  id: string;
  title: string;
  createdAt: number;
}

interface WatchlistItem {
  id: string; // id của movie hoặc tv (đã tự gắn và phân loại ví dụ movie_123, tv_123,... từ client rồi)
  media_type: "movie" | "tv"; // để biết loại
  data: Movie | TV; // full object của movie hoặc tv (từ TMDB)
}

interface Movie {
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

interface TV {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
