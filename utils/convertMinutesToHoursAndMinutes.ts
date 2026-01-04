function convertMinutesToHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60); // Get the whole number of hours
  const minutes = totalMinutes % 60; // Get the remaining minutes

  // Optional: Add leading zeros for single-digit minutes
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}h ${formattedMinutes}m`;
}

export default convertMinutesToHoursAndMinutes;
