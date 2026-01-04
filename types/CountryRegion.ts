interface CountryRegion {
  iso_3166_1: string;
  flag: string;
  name: string;
}

interface CountryRegions {
  [key: string]: CountryRegion;
}
