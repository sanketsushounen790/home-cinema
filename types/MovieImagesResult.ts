interface MovieBackdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: null | string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface MovieLogo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: string;
  vote_count: number;
  width: number;
}

interface MoviePoster {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface MovieImagesResult {
  backdrops: MovieBackdrop[];
  logos: MovieLogo[];
  posters: MoviePoster[];
  id: number;
}
