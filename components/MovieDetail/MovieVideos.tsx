"use client";

import fetchMovieVideos from "@/services/MovieDetail/fetchMovieVideos";
import { useQuery } from "@tanstack/react-query";

interface MovieVideosProps {
  movieId: string | number;
}
const MovieVideos = ({ movieId }: MovieVideosProps) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getMovieVideos", movieId],
    queryFn: () => fetchMovieVideos(movieId),
    staleTime: Infinity,
  });

  //console.log("movie video", data);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!data || data?.results.length === 0) {
    return <div>No Data</div>;
  } else {
    return (
      <div className="w-full">
        <div className="w-full h-auto flex justify-start items-center">
          <div className="w-full h-full px-2 pt-4 pb-8 flex justify-start items-start gap-3 overflow-x-scroll touch-pan-x scroll-smooth">
            {data?.results?.map((video, index) => (
              <div
                key={index}
                className="w-auto h-[300px] flex-shrink-0 rounded-lg"
              >
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default MovieVideos;
