export function calculateAge(birthday: string): number {
  const [year, month, day] = birthday.split("-").map(Number);

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}
