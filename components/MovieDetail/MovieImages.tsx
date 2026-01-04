"use client";

import fetchMovieImages from "@/services/MovieDetail/fetchMovieImages";
import { useQuery } from "@tanstack/react-query";

interface MovieImagesProps {
  movieId: string | number;
}
const MovieImages = ({ movieId }: MovieImagesProps) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getMovieImages", movieId],
    queryFn: () => fetchMovieImages(movieId),
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!data || data?.backdrops.length === 0) {
    return <div>No Data</div>;
  } else {
    return (
      <div className="w-full">
        <div className="w-full h-auto flex justify-start items-center">
          <div className="w-full h-full px-2 py-4 flex justify-start items-start gap-3 overflow-x-scroll touch-pan-x scroll-smooth">
            {data?.backdrops?.map((backdrop, index) => (
              <div
                key={index}
                className="w-auto h-auto flex-shrink-0 rounded-lg"
              >
                <img
                  src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${backdrop.file_path}`}
                  alt={`image-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default MovieImages;
