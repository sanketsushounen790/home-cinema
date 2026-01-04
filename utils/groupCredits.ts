export function groupCredits(
  cast: CastCredit[],
  crew: CrewCredit[]
): Record<string, (CastCredit | CrewCredit)[]> {
  const result: Record<string, (CastCredit | CrewCredit)[]> = {};

  // Cast → Acting
  cast.forEach((item) => {
    if (!result["Acting"]) result["Acting"] = [];
    result["Acting"].push(item);
  });

  // Crew → group by department
  crew.forEach((item) => {
    const dep = item.department ?? "Other";

    if (!result[dep]) result[dep] = [];
    result[dep].push(item);
  });

  return result;
}

// export function mergeCrewCredits(
//   crewArray: (PersonCrewCreditMovie | PersonCrewCreditTV)[]
// ): CrewCredit[] {
//   const map = new Map<number, CrewCredit>();

//   for (const item of crewArray) {
//     const existing = map.get(item.id);

//     if (!existing) {
//       // Clone item, ép job -> array, episode_count -> array
//       // @ts-ignore
//       map.set(item.id, {
//         ...item,
//         job: item.job ? [item.job] : [],
//         episode_count: "episode_count" in item ? [item.episode_count] : [], // Movie: empty array
//       } as CrewCredit);
//       continue;
//     }

//     // Merge job
//     if (item.job && !existing.job.includes(item.job)) {
//       // @ts-ignore
//       existing.job.push(item.job);

//       // TV: thêm episode_count tương ứng

//       if ("episode_count" in item && "episode_count" in existing) {
//         // @ts-ignore
//         existing.episode_count.push(item.episode_count);
//       }
//     }
//   }

//   return Array.from(map.values());
// }
export function mergeCrewCredits(
  crewArray: (PersonCrewCreditMovie | PersonCrewCreditTV)[]
): CrewCredit[] {
  const map = new Map<number, CrewCredit>();

  for (const item of crewArray) {
    const existing = map.get(item.id);

    if (!existing) {
      // Clone item, ép job + credit_id -> array, episode_count -> array
      // @ts-ignore
      map.set(item.id, {
        ...item,
        job: item.job ? [item.job] : [],
        credit_id: item.credit_id ? [item.credit_id] : [],
        episode_count: "episode_count" in item ? [item.episode_count] : [], // Movie: empty array
      } as CrewCredit);
      continue;
    }

    // Merge job
    if (item.job && !existing.job.includes(item.job)) {
      // @ts-ignore
      existing.job.push(item.job);
      if ("episode_count" in item && "episode_count" in existing) {
        // @ts-ignore
        existing.episode_count.push(item.episode_count);
      }
    }

    // Merge credit_id
    if (item.credit_id && !existing.credit_id.includes(item.credit_id)) {
      // @ts-ignore
      existing.credit_id.push(item.credit_id);
    }
  }

  return Array.from(map.values());
}
