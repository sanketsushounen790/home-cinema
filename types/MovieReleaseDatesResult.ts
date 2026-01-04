interface MovieCertificate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

interface MovieReleaseDate {
  iso_3166_1: string;
  release_dates: MovieCertificate[];
}

interface MovieReleaseDatesResult {
  id: number;
  results: MovieReleaseDate[];
}
