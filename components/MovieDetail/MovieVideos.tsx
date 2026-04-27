"use client";

import fetchMovieVideos from "@/services/MovieDetail/fetchMovieVideos";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface MovieVideosProps {
  movieId: string | number;
}

const MovieVideoFrame = ({ videoKey }: { videoKey: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-[560px] h-[315px] relative flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
      {!loaded && (
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
      )}

      <iframe
        className={`w-full h-full transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={() => setLoaded(true)}
      ></iframe>
    </div>
  );
};

const MovieVideos = ({ movieId }: MovieVideosProps) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getMovieVideos", movieId],
    queryFn: () => fetchMovieVideos(movieId),
    staleTime: Infinity,
  });

  //console.log("movie video", data);

  if (isLoading) {
    return (
      <div className="w-full" aria-busy="true" aria-live="polite">
        <div className="w-full h-auto flex justify-start items-center">
          <div className="w-full h-full px-2 pt-4 pb-8 flex justify-start items-start gap-3 overflow-x-scroll touch-pan-x scroll-smooth">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-[560px] h-[315px] flex-shrink-0 rounded-lg bg-white/10 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (error) {
    return <div>Something went wrong</div>;
  } else if (!data || data?.results.length === 0) {
    return <div>No Data</div>;
  } else {
    return (
      <div className="w-full">
        <div className="w-full h-auto flex justify-start items-center">
          <div className="w-full h-full px-2 pt-4 pb-8 flex justify-start items-start gap-3 overflow-x-scroll touch-pan-x scroll-smooth">
            {data?.results?.map((video, index) => (
              <MovieVideoFrame key={video?.key ?? index} videoKey={video.key} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default MovieVideos;
