"use client";

import React from "react";

export default function MovieDetailSkeleton() {
  const chipPlaceholders = Array.from({ length: 6 });
  const castPlaceholders = Array.from({ length: 8 });
  const crewPlaceholders = Array.from({ length: 3 });

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center mb-10">
      <div className="relative w-full min-h-[550px] h-auto overflow-hidden">
        <div className="absolute inset-0 bg-base-300/30" />

        <div
          className="absolute inset-0 bg-gradient-to-r
             from-transparent
             via-neutral-900/10
             to-neutral-900/30"
        />

        <div className="relative z-10 flex items-start gap-8 p-10">
          <div className="w-full h-full flex justify-center items-start gap-6 flex-col lg:flex-row">
            <div className="w-[300px] h-[400px] rounded-lg bg-base-300 animate-pulse" />

            <div className="w-full lg:w-[70%] h-full flex flex-col justify-start items-start backdrop-blur-sm border bg-base-200/20 border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-4">
              <div className="h-8 w-[70%] rounded bg-base-300 animate-pulse" />

              <div className="w-full flex flex-wrap justify-start items-center gap-2 mt-3">
                <div className="h-5 w-10 rounded bg-base-300 animate-pulse" />
                <div className="h-5 w-24 rounded bg-base-300 animate-pulse" />
                <div className="h-4 w-7 rounded bg-base-300 animate-pulse" />
                <div className="h-5 w-14 rounded bg-base-300 animate-pulse" />
              </div>

              <div className="w-full flex flex-wrap justify-start items-center gap-2 mt-3">
                {chipPlaceholders.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-7 w-20 rounded-full bg-base-300 animate-pulse"
                  />
                ))}
                <div className="h-6 w-16 rounded bg-base-300 animate-pulse" />
              </div>

              <div className="w-full h-auto my-4 flex flex-wrap justify-start items-center gap-4">
                <div className="w-[45px] h-[45px] rounded-full bg-base-300 animate-pulse" />
                <div className="h-10 w-28 rounded-lg bg-base-300 animate-pulse" />
                <div className="h-10 w-32 rounded-lg bg-base-300 animate-pulse" />
              </div>

              <div className="h-5 w-40 rounded bg-base-300 animate-pulse" />
              <div className="mt-3 h-6 w-28 rounded bg-base-300 animate-pulse" />

              <div className="mt-3 w-full space-y-2">
                <div className="h-4 w-[95%] rounded bg-base-300 animate-pulse" />
                <div className="h-4 w-[90%] rounded bg-base-300 animate-pulse" />
                <div className="h-4 w-[80%] rounded bg-base-300 animate-pulse" />
              </div>

              <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                {crewPlaceholders.map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="h-5 w-[70%] rounded bg-base-300 animate-pulse" />
                    <div className="h-4 w-[55%] rounded bg-base-300 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col justify-start items-center mt-4">
        <div className="w-[90%] h-7 rounded bg-base-300 animate-pulse" />

        <div className="w-[90%] h-auto flex flex-col justify-start items-center">
          <div className="w-full h-full px-1 py-5 flex justify-start items-start gap-7 overflow-x-scroll touch-pan-x scroll-smooth">
            {castPlaceholders.map((_, idx) => (
              <div
                key={idx}
                className="w-[150px] h-[300px] flex-shrink-0 rounded-lg bg-base-300 animate-pulse"
              />
            ))}

            <div className="w-[155px] h-[300px] flex-shrink-0 rounded-lg bg-base-300 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

