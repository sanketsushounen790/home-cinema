import { X } from "lucide-react";
import Link from "next/link";

interface TVCreditsModalProps {
  open: boolean;
  onClose: () => void;
  cast: TVSerieAggregateCreditsCast[];
  crew: TVSerieAggregateCreditsCrew[];
}

export default function TVCreditsModal({
  open,
  onClose,
  cast,
  crew,
}: TVCreditsModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-base-100 w-full max-w-4xl rounded-xl shadow-xl p-6
                   max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Cast & Crew</h2>
          <button
            onClick={onClose}
            className="cursor-pointer bg-base-100 hover:bg-base-300"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <div className="w-full flex justify-evenly items-start gap-12">
          <div className="w-[50%] mt-2">
            <p className="font-bold text-[17px]">CAST</p>
            <div className="py-5 w-full h-auto flex flex-col justify-start items-start gap-8">
              {cast.map((person, index) => (
                <div
                  key={index}
                  className={`w-full h-auto flex justify-start ${
                    person.roles.length <= 2 ? "items-center" : "items-start"
                  } gap-4 bg-base-300 shadow-lg`}
                >
                  {person.profile_path ? (
                    <div className="w-[100px] h-[100px]">
                      <img
                        src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-full"
                      />
                    </div>
                  ) : person.gender === 2 ? (
                    <div className="w-[100px] h-[100px]">
                      <img
                        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                        alt={person.name}
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-[100px] h-[100px]">
                      <img
                        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg`}
                        alt={person.name}
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  <div className="w-full flex flex-col justify-start items-start pb-1">
                    <Link
                      href={`/person/${person.id}`}
                      className="cursor-pointer"
                    >
                      <div className="w-full font-bold hover:underline">
                        {person.name}
                      </div>
                    </Link>
                    <div className="w-full text-[17px] font-normal">
                      {person.roles.length === 1 ? (
                        <div>{person.roles[0].character}</div>
                      ) : (
                        person.roles.map((item, index) => (
                          <div key={index}>
                            • {item.character}
                            <br></br>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[50%] mt-2">
            <p className="font-bold text-[17px]">CREW</p>
            <div className="py-5 w-full h-auto flex flex-col justify-start items-start gap-8">
              {crew.map((person, index) => (
                <div
                  key={index}
                  className={`w-full h-auto flex justify-start ${
                    person.jobs.length <= 2 ? "items-center" : "items-start"
                  } gap-4 bg-base-300 shadow-lg`}
                >
                  {person.profile_path ? (
                    <div className="w-[100px] h-[100px]">
                      <img
                        src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-full"
                      />
                    </div>
                  ) : person.gender === 2 ? (
                    <div className="w-[100px] h-[100px]">
                      <img
                        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                        alt={person.name}
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-[100px] h-[100px]">
                      <img
                        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg`}
                        alt={person.name}
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  <div className="w-full flex flex-col justify-start items-start pb-1">
                    <Link
                      href={`/person/${person.id}`}
                      className="cursor-pointer"
                    >
                      <div className="w-full font-bold hover:underline">
                        {person.name}
                      </div>
                    </Link>

                    <div className="w-full text-[17px] font-normal">
                      {person.jobs.length === 1 ? (
                        <div>{person.jobs[0].job}</div>
                      ) : (
                        person.jobs.map((item, index) => (
                          <div key={index}>
                            • {item.job}
                            <br></br>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
