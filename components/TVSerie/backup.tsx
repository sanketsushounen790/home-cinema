<div
  className="w-full h-[3000px] flex justify-center items-center inset-0 bg-fixed bg-cover bg-center z-0"
  style={{
    backgroundImage: `url('https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${result.backdrop_path}')`,
  }}
>
  <div className="w-[80%] h-full flex justify-center items-start gap-6 py-10 ">
    <div className="w-[300px] h-[400px]">
      <img
        src={`https://image.tmdb.org/t/p/w1280/${result.poster_path}`}
        alt={result.name}
        width={300}
        height={400}
        className="rounded-lg"
      />
    </div>
    <div className="w-[70%] h-full flex flex-col justify-start items-start text-black bg-green-200">
      <div className="font-bold text-[25px]">
        {result.name} ({result.first_air_date.slice(0, 4)})
      </div>
      <div className="w-full flex justify-start items-center gap-4 bg-pink-200">
        <TVSerieContentRatings tvId={result.id} />
        {/* <div className="w-auto">PG</div>
              <div className="w-auto">{result.release_date} •</div> */}
        <div className="w-auto flex justify-start items-center gap-4 bg-cyan-200">
          {result.genres.map((genre, index) => (
            <Link key={index} href={`/genre/tv/${genre.id}-${genre.name}`}>
              <div
                className="inline-block px-3 py-1 text-sm font-medium rounded-full border border-gray-400 text-gray-600
                     hover:bg-gray-400/10 transition-colors cursor-pointer"
              >
                {genre.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full h-auto my-3 flex justify-start items-center gap-4 bg-blue-300">
        <div
          className={` w-[45px] h-[45px] rounded-full
                     flex items-center justify-center font-semibold text-sm
                     shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                     border-2 bg-black ${
                       result.vote_average >= 7
                         ? "text-green-400 border-green-400"
                         : result.vote_average >= 5
                         ? "text-yellow-400 border-yellow"
                         : "text-red-400 border-red"
                     } `}
          aria-label={`rating ${result.vote_average}`}
        >
          {roundUpToDecimal(result.vote_average, 1)}
        </div>
        <button className="btn btn-outline">Trailer</button>
        <Link href={`/movie/${result.id}/watch`}>
          <button className="btn btn-outline">Xem Phim</button>
        </Link>
      </div>

      <div className="text-[17px] italic">{result.tagline}</div>
      <div className="font-bold text-[20px]">Overview</div>
      <p>{result.overview}</p>

      <div className="mt-2">
        {/* <TVSerieCreditsImportRoles crew={result?.credits?.crew} /> */}
        {result.created_by.map((person, index) => (
          <div key={index}>
            <Link href={`/person/${person.id}`} className="hover:underline">
              <div className="font-bold">{person.name}</div>
            </Link>

            <div>Creator</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>;
