"use client";
import Image from "next/image";

import fetchSearchMultiResult from "@/services/Search/fetchSearchMultiResult";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import { Loader2, Search, X } from "lucide-react";

import femaleAvatar from "../../assets/female_avatar.jpg";
import maleAvatar from "../../assets/male_avatar.jpg";
import cardPlaceholder from "../../assets/card_placeholder.jpg";

function isMovie(
  item: SearchMovieResult | SearchPersonResult | SearchTVResult
): item is SearchMovieResult {
  return item.media_type === "movie";
}

function isTV(
  item: SearchMovieResult | SearchPersonResult | SearchTVResult
): item is SearchTVResult {
  return item.media_type === "tv";
}

function isPerson(
  item: SearchMovieResult | SearchPersonResult | SearchTVResult
): item is SearchPersonResult {
  return item.media_type === "person";
}

function truncate(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str; // No truncation needed
  }

  // Calculate the length for the truncated part, accounting for the ellipsis
  const truncatedLength = maxLength - 3;

  // Ensure truncatedLength is not negative if maxLength is very small
  if (truncatedLength < 0) {
    return "..."; // Or handle this edge case as desired
  }

  // Slice the string and append the ellipsis
  return str.slice(0, truncatedLength) + "...";
}

export default function SearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { isLoading, isFetching, error, data, refetch } = useQuery({
    queryKey: ["getSearchResult"],
    queryFn: () => fetchSearchMultiResult(query, false, "en-US", 1),
    staleTime: Infinity,
  });

  console.log(data?.results);
  // Debounce 400ms
  useEffect(() => {
    if (!query.trim()) return;

    setTyping(true);

    const timer = setTimeout(() => {
      setTyping(false);

      if (query !== "") {
        refetch(); // gọi react-query của bạn
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-[500px] bg-base-100">
      {/* SEARCH INPUT */}
      <input
        type="text"
        value={query}
        placeholder="Search for a movie, tv show, person,..."
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        className="
          w-full px-3 py-1.5 rounded-md text-sm 
          bg-base-100 border border-base-content 
          focus:border-blue-500 focus:ring-0 
          outline-none shadow-sm
        "
      />

      {/* RIGHT BUTTON */}
      <button
        type="button"
        onClick={() => {
          if (!isLoading) setQuery(""); // clear nếu đang không loading
        }}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          flex items-center justify-center
          w-6 h-6
          text-gray-500
        "
      >
        {/* Loading spinner */}
        {isFetching ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : query.length > 0 ? (
          <X className="w-5 h-5 hover:text-gray-700 cursor-pointer" />
        ) : (
          <Search className="w-5 h-5 hover:text-gray-700" />
        )}
      </button>

      {/* RESULTS DROPDOWN */}
      {isFocused && data?.results !== undefined && query !== "" && (
        <div
          className={`absolute left-0 top-[105%] w-full bg-base-100 rounded-md shadow-lg z-50 max-h-[500px] overflow-y-auto ${
            data.results.length === 0 ? "" : "border border-base-content"
          }`}
        >
          {data?.results &&
            data?.results.map((item, index) => (
              <div
                key={index}
                className="p-2 text-sm cursor-pointer hover:bg-base-300 transition flex items-center gap-2"
                onClick={() => {
                  router.push(`/${item?.media_type}/${item.id}`);
                  setQuery("");
                }}
              >
                {/* Thumbnail nhỏ */}
                {isMovie(item) && (
                  <>
                    {item ? (
                      item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                          className="w-10 h-12 rounded object-cover"
                          alt={item.title}
                        />
                      ) : (
                        <Image
                          src={cardPlaceholder}
                          alt={item.title}
                          className="w-10 h-12 rounded object-cover"
                        />
                      )
                    ) : (
                      <div className="w-8 h-10 bg-gray-200 rounded" />
                    )}

                    <span className="line-clamp-1 font-bold">
                      {truncate(item.title, 30)}
                    </span>
                    <div>in Movies</div>
                  </>
                )}

                {isTV(item) && (
                  <>
                    {item ? (
                      item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                          className="w-10 h-12 rounded object-cover"
                          alt={item.name}
                        />
                      ) : (
                        <Image
                          src={cardPlaceholder}
                          alt={item.name}
                          className="w-10 h-12 rounded object-cover"
                        />
                      )
                    ) : (
                      <div className="w-8 h-10 bg-gray-200 rounded" />
                    )}

                    <span className="line-clamp-1 font-bold">
                      {truncate(item.name, 30)}
                    </span>
                    <div>in TV Shows</div>
                  </>
                )}

                {isPerson(item) && (
                  <>
                    {item ? (
                      item.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.profile_path}`}
                          className="w-10 h-12 rounded object-cover"
                          alt={item.name}
                        />
                      ) : item.gender === 2 ? (
                        <Image
                          src={maleAvatar}
                          alt={item.name}
                          className="w-10 h-12 rounded object-cover"
                        />
                      ) : (
                        <Image
                          src={femaleAvatar}
                          alt={item.name}
                          className="w-10 h-12 rounded object-cover"
                        />
                      )
                    ) : (
                      <div className="w-8 h-10 bg-gray-200 rounded" />
                    )}

                    <span className="line-clamp-1 font-bold">
                      {truncate(item.name, 30)}
                    </span>
                    <div>in People</div>
                  </>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
