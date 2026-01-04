interface CountryTVSerieCertificate {
  certification: string;
  meaning: string;
  order: number;
}

interface CountryTVSerieCertificates {
  [key: string]: CountryTVSerieCertificate[];
}
