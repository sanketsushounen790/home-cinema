import MovieCarousel from "../Movie/MovieCarousel";
import TrendingList from "../List/TrendingList";
import PopularList from "../List/PopularList";
import TopRatedList from "../List/TopRatedList";
import UpcomingList from "../List/UpcomingList";

const HomePage = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <div className="w-full h-auto flex justify-center items-center mt-5 cursor-pointer">
        <div
          className="max-w-[90%] w-full mx-auto"
          style={{ isolation: "isolate" }}
        >
          <MovieCarousel />
        </div>
        {/* <div className="w-[90%] h-full bg-cyan-200">1</div> */}
      </div>

      <div className="w-full h-auto flex flex-col justify-center items-center mt-5 pb-5">
        <TrendingList />

        <TopRatedList />

        <PopularList />

        <UpcomingList />
      </div>
    </div>
  );
};

export default HomePage;
