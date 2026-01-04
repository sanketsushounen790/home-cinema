import Link from "next/link";

interface MovieCreditsImportantRolesProps {
  crew: any[];
}

const MovieCreditsImportantRoles = ({
  crew,
}: MovieCreditsImportantRolesProps) => {
  console.log(crew);

  return (
    <div className="w-full flex flex-wrap justify-start items-center gap-4">
      {crew?.map((crew, index) => (
        <div
          key={index}
          className="w-[200px] flex flex-col justify-center items-start"
        >
          <Link href={`/person/${crew.id}`} className="hover:underline">
            <p className="text-[16px] font-bold">{crew.name}</p>
          </Link>

          <div className="w-full flex flex-wrap">
            {crew?.jobs.map((job: any, index: any) => (
              <div key={index} className="text-[15px]">
                {index !== 0 && ","} {job}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCreditsImportantRoles;
