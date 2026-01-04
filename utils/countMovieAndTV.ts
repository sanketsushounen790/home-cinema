export function countMovieAndTV(combined: { cast: any[]; crew: any[] }) {
  const all = [...combined.cast, ...combined.crew];

  const movieCount = all.filter((item) => item.media_type === "movie").length;

  // Những cái KHÔNG PHẢI movie → TV
  const tvCount = all.length - movieCount;

  return {
    movie: movieCount,
    tv: tvCount,
  };
}
