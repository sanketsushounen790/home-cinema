"use client";

import React from "react";

type MediaType = "movie" | "tv";

const CarouselLoading = ({ active = "movie" }: { active?: MediaType }) => {
  const chipPlaceholders = Array.from({ length: 5 });
  const dotPlaceholders = Array.from({ length: 5 });

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-base-300 animate-pulse z-0" />

      {/* Media type switch skeleton (top-left) */}
      <div className="absolute top-[10px] left-[10px] z-30">
        <div className="relative flex bg-[#e9eef3]/90 rounded-full p-1 w-[180px] overflow-hidden z-20 mb-2">
          <div
            className="absolute top-1 bottom-1 w-[85px] rounded-full bg-[#0d1b2a] opacity-80"
            style={{
              left: active === "movie" ? "4px" : "calc(100% - 89px)",
            }}
          />

          <div className="z-[2] flex-1 py-1.5 flex items-center justify-center">
            <div className="h-4 w-14 rounded bg-white/20 animate-pulse" />
          </div>

          <div className="z-[2] flex-1 py-1.5 flex items-center justify-center">
            <div className="h-4 w-16 rounded bg-black/10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Gradient overlay (like real carousel) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

      {/* Navigation placeholders */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <div className="w-10 h-10 rounded-full bg-gray-600/70 animate-pulse" />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
        <div className="w-10 h-10 rounded-full bg-gray-600/70 animate-pulse" />
      </div>

      {/* Pagination dots placeholders */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {dotPlaceholders.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full animate-pulse ${
              idx === 0 ? "bg-white/50" : "bg-white/25"
            }`}
          />
        ))}
      </div>

      {/* Text content placeholders */}
      <div className="absolute bottom-0 left-0 p-10 max-w-2xl text-white z-20">
        <div className="h-10 w-[80%] rounded bg-white/15 animate-pulse" />

        <div className="mt-4 flex items-center gap-3">
          <div className="w-[45px] h-[45px] rounded-full bg-black border-2 border-white/20 animate-pulse" />

          <div className="flex flex-wrap gap-2">
            {chipPlaceholders.map((_, idx) => (
              <div
                key={idx}
                className="h-7 w-20 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-4 w-[95%] rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-[90%] rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-[75%] rounded bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default CarouselLoading;
