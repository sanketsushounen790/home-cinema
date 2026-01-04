export function isCrew(
  item: any
): item is PersonCrewCreditMovie | PersonCrewCreditTV {
  return "department" in item;
}

export function isCast(
  item: any
): item is PersonCastCreditMovie | PersonCastCreditTV {
  return "character" in item && !("department" in item);
}

export function isMovie(
  item: CastCredit | CrewCredit
): item is PersonCastCreditMovie | PersonCrewCreditMovie {
  return "title" in item;
}

export function isTV(
  item: CastCredit | CrewCredit
): item is PersonCastCreditTV | PersonCrewCreditTV {
  return "name" in item && !("title" in item);
}
