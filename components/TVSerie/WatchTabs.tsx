"use client";

import Link from "next/link";
import { useState } from "react";

import femaleAvatar from "../../assets/female_avatar.jpg";
import maleAvatar from "../../assets/male_avatar.jpg";
import Image from "next/image";
import TVCommentBox from "../Comments/TVCommentBox";

interface WatchTabsProps {
  episode: SeasonDetailEpisode;
  episode_credits: EpisodeCreditsResult;
  tvId: string | number;
  rootCommentId?: string;
  focusCommentId?: string;
}
export default function WatchTabs({
  episode,
  episode_credits,
  tvId,
  rootCommentId,
  focusCommentId,
}: WatchTabsProps) {
  const [activeTab, setActiveTab] = useState<"info" | "comments">("info");

  console.log(episode);

  return (
    <div className="h-auto mt-4 pb-8 overflow-hidden">
      {/* TAB HEADERS */}
      <div className="flex">
        <button
          className={`p-2 text-center cursor-pointer font-semibold border-r-1 border-b-transparent z-50 ${
            activeTab === "comments"
              ? "bg-base-200 border-t-1 border-l-1"
              : "hover:underline transition"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
        <button
          className={`p-2 text-center cursor-pointer font-semibold  border-b-transparent z-50 ${
            activeTab === "info"
              ? "bg-base-200 border-t-1 border-r-1"
              : "hover:underline transition"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Episode Info
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="h-auto bg-base-200 mt-[-1px] border z-40">
        {activeTab === "info" ? (
          <div className="h-auto flex flex-col justify-center items-start gap-2 p-4">
            <h3 className="font-semibold text-lg mb-2">
              EP{episode?.episode_number}. {episode?.name}
            </h3>
            <p className="mb-1">
              <span className="font-semibold">Air Date:</span>{" "}
              {episode?.air_date || "Unknown"}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Runtime:</span>{" "}
              {episode?.runtime || "N/A"} minutes
            </p>
            <p className="mb-1">
              <span className="font-semibold">Rating:</span>{" "}
              {episode?.vote_average?.toFixed(1) || "N/A"}
            </p>
            <p className="mt-2">
              {episode?.overview || "No description available."}
            </p>

            <div className="w-full flex justify-evenly items-start gap-2">
              <div className="w-[50%] mt-2">
                <p className="font-bold text-[17px]">
                  EPISODE CAST ({episode_credits?.guest_stars.length})
                </p>
                <div className="py-5 w-full h-auto flex flex-col justify-start items-start gap-8">
                  {episode_credits?.guest_stars.map((person, index) => (
                    <div
                      key={index}
                      className="w-[90%] h-auto flex justify-start items-center gap-4 shadow-lg "
                    >
                      <div className="w-[100px] h-[100px]">
                        {person.profile_path ? (
                          <img
                            src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full"
                          />
                        ) : person.gender === 2 ? (
                          <Image
                            src={maleAvatar}
                            alt={person.name}
                            className="w-full h-[100px] rounded-t-lg"
                          />
                        ) : (
                          <Image
                            src={femaleAvatar}
                            alt={person.name}
                            className="w-full h-[100px] rounded-t-lg"
                          />
                        )}
                      </div>

                      <div className="w-full flex flex-col justify-start items-start">
                        <Link
                          href={`/person/${person.id}`}
                          className="cursor-pointer"
                        >
                          <div className="w-full font-bold hover:underline">
                            {person.name}
                          </div>
                        </Link>
                        <div className="w-full">{person.character}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-bold text-[17px]">
                  MAIN CAST ({episode_credits?.cast.length})
                </p>
                <div className="py-5 w-full h-auto flex flex-col justify-start items-start gap-8">
                  {episode_credits?.cast.map((person, index) => (
                    <div
                      key={index}
                      className="w-[90%] h-auto flex justify-start items-center gap-4 shadow-lg "
                    >
                      <div className="w-[100px] h-[100px]">
                        {person.profile_path ? (
                          <img
                            src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full"
                          />
                        ) : person.gender === 2 ? (
                          <Image
                            src={maleAvatar}
                            alt={person.name}
                            className="w-full h-[100px] rounded-t-lg"
                          />
                        ) : (
                          <Image
                            src={femaleAvatar}
                            alt={person.name}
                            className="w-full h-[100px] rounded-t-lg"
                          />
                        )}
                      </div>

                      <div className="w-full flex flex-col justify-start items-start">
                        <Link
                          href={`/person/${person.id}`}
                          className="cursor-pointer"
                        >
                          <div className="w-full font-bold hover:underline">
                            {person.name}
                          </div>
                        </Link>
                        <div className="w-full">{person.character}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-[50%] mt-2">
                <p className="font-bold text-[17px]">
                  CREW ({episode_credits?.crew.length})
                </p>
                <div className="py-5 w-full h-auto flex flex-col justify-start items-start gap-8">
                  {episode_credits?.crew.map((person, index) => (
                    <div
                      key={index}
                      className="w-[90%] h-auto flex justify-start items-center gap-4 shadow-lg "
                    >
                      <div className="w-[100px] h-[100px]">
                        {person.profile_path ? (
                          <img
                            src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full"
                          />
                        ) : person.gender === 2 ? (
                          <Image
                            src={maleAvatar}
                            alt={person.name}
                            className="w-full h-[100px] rounded-t-lg"
                          />
                        ) : (
                          <Image
                            src={femaleAvatar}
                            alt={person.name}
                            className="w-full h-[100px] rounded-t-lg"
                          />
                        )}
                      </div>

                      <div className="w-full flex flex-col justify-start items-start">
                        <Link
                          href={`/person/${person.id}`}
                          className="cursor-pointer"
                        >
                          <div className="w-full font-bold hover:underline">
                            {person.name}
                          </div>
                        </Link>

                        <div className="w-full">{person.job}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Placeholder comments */}
            <TVCommentBox
              postId={`tv_${tvId}`}
              focusCommentId={focusCommentId}
              rootCommentId={rootCommentId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
