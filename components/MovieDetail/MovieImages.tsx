"use client";

import fetchMovieImages from "@/services/MovieDetail/fetchMovieImages";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface MovieImagesProps {
  movieId: string | number;
}

const MovieBackdropImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-[533px] h-[300px] relative flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
      {!loaded && (
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
      )}
      <img
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

const MovieImages = ({ movieId }: MovieImagesProps) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getMovieImages", movieId],
    queryFn: () => fetchMovieImages(movieId),
  });

  if (isLoading) {
    return (
      <div className="w-full" aria-busy="true" aria-live="polite">
        <div className="w-full h-auto flex justify-start items-center">
          <div className="w-full h-full px-2 py-4 flex justify-start items-start gap-3 overflow-x-scroll touch-pan-x scroll-smooth">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-[533px] h-[300px] flex-shrink-0 rounded-lg bg-white/10 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (error) {
    return <div>Something went wrong</div>;
  } else if (!data || data?.backdrops.length === 0) {
    return <div>No Data</div>;
  } else {
    return (
      <div className="w-full">
        <div className="w-full h-auto flex justify-start items-center">
          <div className="w-full h-full px-2 py-4 flex justify-start items-start gap-3 overflow-x-scroll touch-pan-x scroll-smooth">
            {data?.backdrops?.map((backdrop, index) => (
              <MovieBackdropImage
                key={backdrop?.file_path ?? index}
                src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${backdrop.file_path}`}
                alt={`image-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default MovieImages;
