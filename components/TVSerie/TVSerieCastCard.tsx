import Link from "next/link";

import femaleAvatar from "../../assets/female_avatar.jpg";
import maleAvatar from "../../assets/male_avatar.jpg";
import Image from "next/image";

interface TVSerieCastCardProps {
  cast: TVSerieAggregateCreditsCast;
}

const TVSerieCastCard = ({ cast }: TVSerieCastCardProps) => {
  console.log(cast);
  return (
    <div className="w-full min-h-[300px] h-auto">
      <div className="">
        {cast.profile_path ? (
          <img
            src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${cast.profile_path}`}
            alt={cast.name}
            className="w-full h-[175px] rounded-t-lg"
          />
        ) : cast.gender === 2 ? (
          <Image
            src={maleAvatar}
            alt={cast.name}
            className="w-full h-[175px] rounded-t-lg"
          />
        ) : (
          <Image
            src={femaleAvatar}
            alt={cast.name}
            className="w-full h-[175px] rounded-t-lg"
          />
        )}
      </div>
      <div className="p-2">
        <Link href={`/person/${cast.id}`} className="hover:underline">
          <div className="font-bold">{cast.name}</div>
        </Link>

        <div className="">{cast.roles[0].character}</div>
      </div>
    </div>
  );
};

export default TVSerieCastCard;
