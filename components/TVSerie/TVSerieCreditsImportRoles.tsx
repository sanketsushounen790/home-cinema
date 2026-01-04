import Link from "next/link";

interface TVSerieCreditsImportRolesProps {
  crew: TVSerieCrewCredit[];
}

const TVSerieCreditsImportRoles = ({
  crew,
}: TVSerieCreditsImportRolesProps) => {
  //   const targetJobs = ["Director", "Screenplay", "Characters", "Story"];

  //   // Sử dụng Array.filter() để lọc ra các objects thỏa mãn điều kiện
  //   const filteredCrew = crew?.filter((member) =>
  //     targetJobs.includes(member.job)
  //   );

  //console.log(filteredCrew);

  return (
    <div className="w-full flex flex-wrap justify-start items-center gap-4 bg-gray-200">
      {crew?.map((crew, index) => (
        <div
          key={index}
          className="w-[200px] flex flex-col justify-center items-start bg-blue-200"
        >
          <Link href={`/person/${crew.id}`} className="hover:underline">
            <p className="text-[15px] font-bold">{crew.name}</p>
          </Link>

          <p className="text-[14px]">{crew.job}</p>
        </div>
      ))}
    </div>
  );
};

export default TVSerieCreditsImportRoles;
