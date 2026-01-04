interface CountryCertificate {
  certification: string;
  meaning: string;
  order: number;
}

interface CountryMovieCertificates {
  [key: string]: CountryCertificate[];
}
