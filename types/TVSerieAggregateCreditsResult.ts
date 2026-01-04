interface TVSerieAggregateCreditsCastRole {
  credit_id: string;
  character: string;
  episode_count: number;
}

interface TVSerieAggregateCreditsCrewJob {
  credit_id: string;
  job: string;
  episode_count: number;
}

interface TVSerieAggregateCreditsCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  roles: TVSerieAggregateCreditsCastRole[];
  total_episode_count: number;
  order: number;
}

interface TVSerieAggregateCreditsCrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  jobs: TVSerieAggregateCreditsCrewJob[];
  department: string;
  total_episode_count: number;
}

interface TVSerieAggregateCreditsResult {
  id: number;
  cast: TVSerieAggregateCreditsCast[];
  crew: TVSerieAggregateCreditsCrew[];
}
