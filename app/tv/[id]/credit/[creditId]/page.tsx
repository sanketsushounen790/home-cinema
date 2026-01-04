import { EpisodeCreditItem } from "@/components/TVSerie/EpisodeCreditItem";
import fetchSeasonCredits from "@/services/TVSerieList/fetchSeasonCredits";
import fetchSeasonDetail from "@/services/TVSerieList/fetchSeasonDetail";
import fetchTVEpisodeCredits from "@/services/TVSerieList/fetchTVEpisodeCredits";
import fetchTVSerieAggregateCredits from "@/services/TVSerieList/fetchTVSerieAggregateCredits";
import fetchTVSerieDetail from "@/services/TVSerieList/fetchTVSerieDetail";

interface TVCreditsPageProps {
  params: {
    id: string;
    creditId: string;
  };
}

async function getActorEpisodes(tvId: string, personCreditId: string) {
  // Step 1: Get TV detail
  const tv = await fetchTVSerieDetail("en-US", tvId);

  const matchedEpisodes: any[] = [];
  let actorInfo: { name: string; character: string } = {
    name: "",
    character: "",
  };

  // Step 2: Loop qua từng season
  for (const season of tv.seasons) {
    if (season.season_number === 0) continue; // bỏ special season

    const seasonData = await fetchSeasonDetail(
      tvId,
      season.season_number,
      "en"
    );

    // Step 3: Kiểm tra từng episode
    const episodes = seasonData.episodes;

    // chạy song song để nhanh
    const checks = episodes.map(async (ep) => {
      const credits = await fetchTVEpisodeCredits(
        tvId,
        ep.season_number,
        ep.episode_number
      );

      // Check cast
      const foundInCast = credits.cast.find(
        (c) => c.credit_id === personCreditId
      );

      // Check guest stars
      const foundInGuest = credits.guest_stars.find(
        (c) => c.credit_id === personCreditId
      );

      const foundActor = foundInCast || foundInGuest;

      if (!foundActor) return;

      // Nếu chưa lưu actorInfo thì lưu lại 1 lần duy nhất
      if (actorInfo.name === "" && actorInfo.character === "") {
        actorInfo = {
          name: foundActor.name,
          character: foundActor.character,
        };
      }

      // bỏ crew và guest_stars khỏi ep
      const { crew, guest_stars, ...cleanEp } = ep;

      matchedEpisodes.push(cleanEp);
    });

    await Promise.all(checks);
  }

  // 👉 Return cả hai
  return {
    actorInfo,
    episodes: matchedEpisodes,
  };
}

async function getCrewEpisodes(tvId: string, personCreditId: string) {
  // Step 1: Get TV detail
  const tv = await fetchTVSerieDetail("en-US", tvId);

  const seasonLevelJobs = [
    "Executive Producer",
    "Co-Executive Producer",
    "Supervising Producer",
    "Producer",
    "Consulting Producer",
    "Co-Producer",
    "Art Direction",
    "Series Director",
  ];
  const matchedEpisodes: any[] = [];
  let crewInfo: { name: string; job: string } = {
    name: "",
    job: "",
  };

  // Step 2: Loop qua từng season
  for (const season of tv.seasons) {
    if (season.season_number === 0) continue; // bỏ special season

    const seasonData = await fetchSeasonDetail(
      tvId,
      season.season_number,
      "en"
    );
    // Lấy season credits
    const seasonCredits = await fetchSeasonCredits(
      "en-US",
      tvId,
      season.season_number
    );

    // Check xem person là Executive/Co-Executive Producer
    const isSeasonLevelCrew = seasonCredits.crew.some(
      (c) => c.credit_id === personCreditId && seasonLevelJobs.includes(c.job)
    );

    if (isSeasonLevelCrew) {
      // Push tất cả episode của season này
      for (const ep of seasonData.episodes) {
        const { crew, guest_stars, ...cleanEp } = ep;
        matchedEpisodes.push(cleanEp);
      }

      // Lưu crewInfo
      if (!crewInfo.name) {
        const foundCrew = seasonCredits.crew.find(
          (c) => c.credit_id === personCreditId
        );
        crewInfo = { name: foundCrew?.name ?? "", job: foundCrew?.job ?? "" };
      }

      // Skip kiểm tra từng episode riêng lẻ
      continue;
    }

    // Step 3: Kiểm tra từng episode
    const episodes = seasonData.episodes;

    // chạy song song để nhanh
    const checks = episodes.map(async (ep) => {
      const credits = await fetchTVEpisodeCredits(
        tvId,
        ep.season_number,
        ep.episode_number
      );

      //console.log(credits);

      // Check crew
      const foundInCrew = credits.crew.find(
        (c) => c.credit_id === personCreditId
      );

      if (!foundInCrew) return;

      // Nếu chưa lưu actorInfo thì lưu lại 1 lần duy nhất
      if (crewInfo.name === "" && crewInfo.job === "") {
        crewInfo = {
          name: foundInCrew.name,
          job: foundInCrew.job,
        };
      }

      // bỏ crew và guest_stars khỏi ep
      const { crew, guest_stars, ...cleanEp } = ep;

      matchedEpisodes.push(cleanEp);
    });

    await Promise.all(checks);
  }

  // 👉 Return cả hai
  return {
    crewInfo,
    episodes: matchedEpisodes,
  };
}

const TVCreditsPage = async ({ params }: TVCreditsPageProps) => {
  const { id, creditId } = await params;

  const tvDetail = await fetchTVSerieDetail("en-US", id);

  const personCreditRole: string = creditId.slice(0, 4);
  const personCreditId: string = creditId.slice(5);

  const handlers: Record<string, () => Promise<any>> = {
    cast: () => getActorEpisodes(id, creditId.slice(5)),
    crew: () => getCrewEpisodes(id, creditId.slice(5)),
  };

  const handler = handlers[personCreditRole];

  if (!handler) return <div>Invalid API Call</div>;

  const result = await handler();

  console.log(result);

  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      <div className="w-[80%] flex justify-start items-center font-bold text-[25px]">
        {personCreditRole === "cast"
          ? result?.actorInfo.name
          : result?.crewInfo.name}
      </div>
      <div className="w-[80%] flex justify-start items-center gap-2 text-[20px]">
        <div>{result.episodes.length}</div>
        <div>Episode{result.episodes.length > 1 ? "s" : ""} as</div>
        <div className="font-bold">
          {personCreditRole === "cast"
            ? result?.actorInfo.character
            : result?.crewInfo.job}
        </div>
        <div>in</div>
        <div className="font-bold">{tvDetail.name}</div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 mt-2">
        {result.episodes.map((item: any, index: number) => (
          <div key={index} className="w-[80%]">
            <EpisodeCreditItem tvId={id} ep={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVCreditsPage;
