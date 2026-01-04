import { X } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

import femaleAvatar from "../../assets/female_avatar.jpg";
import maleAvatar from "../../assets/male_avatar.jpg";

interface MovieCreditsModalProps {
  open: boolean;
  onClose: () => void;
  cast: any[];
  crew: any[];
}

export default function MovieCreditsModal({
  open,
  onClose,
  cast,
  crew,
}: MovieCreditsModalProps) {
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
                  className={`w-full h-auto flex justify-start items-center gap-4 bg-base-300 shadow-lg`}
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
                      <Image
                        src={maleAvatar}
                        alt={person.name}
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-[100px] h-[100px]">
                      <Image
                        src={femaleAvatar}
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
                      {person.character}
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
                      <Image
                        src={maleAvatar}
                        alt={person.name}
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-[100px] h-[100px]">
                      <Image
                        src={femaleAvatar}
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
                      {person?.jobs.length === 1 ? (
                        <div>{person.jobs[0]}</div>
                      ) : (
                        person?.jobs.map((item: any, index: number) => (
                          <div key={index}>
                            • {item}
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
