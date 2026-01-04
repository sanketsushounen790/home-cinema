interface TVSerieContentRating {
  descriptors: string[];
  iso_3166_1: string;
  rating: string;
}

interface TVSerieContentRatingsResult {
  id: number;
  results: TVSerieContentRating[];
}
