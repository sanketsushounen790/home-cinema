"use client";

import Link from "next/link";
import { usePopularPeople } from "./hook/usePopularPeople";

const PopularPeople = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePopularPeople();

  const people = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full text-[23px] font-bold flex justify-start items-center ml-14 mt-4">
        Popular Peope
      </div>
      <div className="w-[95%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
        {people.map((person, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-sm bg-base-300 cursor-pointer hover:shadow-md transition"
          >
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${person.profile_path}`}
              alt={person.name}
              className="w-full h-[320px] object-cover"
            />

            <div className="p-3 space-y-1">
              <Link
                href={`/person/${person.id}`}
                className="hover:underline cursor-pointer"
              >
                <h3 className="font-semibold">{person.name}</h3>
              </Link>

              {person.known_for.map((item, index) => (
                <p key={index} className="text-gray-500 line-clamp-2">
                  <Link
                    href={`${
                      // @ts-ignore
                      item?.title ? `/movie/${item.id}` : `/tv/${item.id}`
                    }`}
                    className="hover:underline cursor-pointer"
                  >
                    {/* @ts-ignore */}
                    {item?.name || item?.title}
                  </Link>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="mt-1 mb-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer"
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default PopularPeople;
