"use client";

import { useThemeStore } from "@/store/themeStore";
import React from "react";

export default function PersonDetailLoading() {
  const { theme } = useThemeStore();
  const knownForPlaceholders = Array.from({ length: 6 });
  const creditRowPlaceholders = Array.from({ length: 8 });

  // Explicit colors so skeleton reads correctly in both themes.
  const block = theme === "light" ? "bg-black/10" : "bg-white/10";
  const blockStrong = theme === "light" ? "bg-black/15" : "bg-white/15";

  return (
    <div className="flex justify-center items-start pt-4 mb-12 mt-4">
      {/* LEFT */}
      <div className="w-[350px] flex flex-col justify-center items-start p-4 bg-base-300 shadow-lg">
        <div
          className={`w-[300px] h-[400px] rounded-lg ${blockStrong} animate-pulse`}
        />

        <div className={`h-7 w-40 rounded ${blockStrong} animate-pulse mt-4`} />

        <div className="flex gap-2 mt-2">
          <div className={`w-8 h-8 rounded ${blockStrong} animate-pulse`} />
          <div className={`w-8 h-8 rounded ${blockStrong} animate-pulse`} />
        </div>

        <div className="mt-4 w-full space-y-3">
          <div>
            <div className={`h-6 w-28 rounded ${blockStrong} animate-pulse`} />
            <div className={`h-4 w-[70%] rounded ${block} animate-pulse mt-2`} />
          </div>

          <div>
            <div
              className={`h-6 w-24 rounded ${blockStrong} animate-pulse mt-1`}
            />
            <div className={`h-4 w-[45%] rounded ${block} animate-pulse mt-2`} />
          </div>

          <div>
            <div
              className={`h-6 w-32 rounded ${blockStrong} animate-pulse mt-1`}
            />
            <div className={`h-4 w-16 rounded ${block} animate-pulse mt-2`} />
          </div>

          <div>
            <div
              className={`h-6 w-20 rounded ${blockStrong} animate-pulse mt-1`}
            />
            <div className={`h-4 w-20 rounded ${block} animate-pulse mt-2`} />
          </div>

          <div>
            <div
              className={`h-6 w-24 rounded ${blockStrong} animate-pulse mt-1`}
            />
            <div className={`h-4 w-[75%] rounded ${block} animate-pulse mt-2`} />
          </div>

          <div>
            <div
              className={`h-6 w-32 rounded ${blockStrong} animate-pulse mt-1`}
            />
            <div className={`h-4 w-[85%] rounded ${block} animate-pulse mt-2`} />
          </div>

          <div>
            <div
              className={`h-6 w-32 rounded ${blockStrong} animate-pulse mt-1`}
            />
            <div className="space-y-2 mt-2">
              <div className={`h-4 w-[80%] rounded ${block} animate-pulse`} />
              <div className={`h-4 w-[60%] rounded ${block} animate-pulse`} />
              <div className={`h-4 w-[70%] rounded ${block} animate-pulse`} />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[70%] p-4 bg-base-200 shadow-lg">
        <div className={`h-8 w-[45%] rounded ${blockStrong} animate-pulse`} />

        <div className="mt-4">
          <div className={`h-6 w-28 rounded ${blockStrong} animate-pulse`} />
          <div className="mt-3 space-y-2">
            <div className={`h-4 w-[95%] rounded ${block} animate-pulse`} />
            <div className={`h-4 w-[92%] rounded ${block} animate-pulse`} />
            <div className={`h-4 w-[88%] rounded ${block} animate-pulse`} />
            <div className={`h-4 w-[70%] rounded ${block} animate-pulse`} />
          </div>
        </div>

        <div className="w-full mt-6">
          <div className={`h-6 w-28 rounded ${blockStrong} animate-pulse`} />

          <div className="w-full h-auto flex flex-col justify-start items-center">
            <div className="w-full max-w-auto h-[410px] px-6 py-5 flex justify-start items-start gap-7 overflow-x-auto z-[10] touch-pan-x scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {knownForPlaceholders.map((_, idx) => (
                <div
                  key={idx}
                  className="relative w-[200px] h-[300px] flex-shrink-0 rounded-lg overflow-hidden"
                >
                  <div className={`absolute inset-0 ${blockStrong} animate-pulse`} />
                  <div
                    className={`absolute right-3 bottom-3 w-10 h-10 rounded-full ${blockStrong} animate-pulse`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full">
            <div className="w-auto absolute top-[-10px] right-[0px] flex justify-end items-center gap-4 font-bold text-[20px]">
              <div className={`h-10 w-28 rounded ${blockStrong} animate-pulse`} />
              <div className={`h-10 w-36 rounded ${blockStrong} animate-pulse`} />
            </div>

            <div className="mt-16">
              <div className={`h-7 w-28 rounded ${blockStrong} animate-pulse`} />
              <div className="px-5 pt-2 pb-1 shadow-xl bg-base-300 mt-2">
                {creditRowPlaceholders.map((_, idx) => (
                  <div
                    key={idx}
                    className="flex justify-start items-start gap-5 mt-3 mb-3"
                  >
                    <div className={`h-4 w-12 rounded ${block} animate-pulse mt-1`} />
                    <div
                      className={`w-4 h-4 rounded-full ${block} animate-pulse mt-1`}
                    />
                    <div className="flex flex-col justify-center items-start flex-1 space-y-2">
                      <div className={`h-5 w-[55%] rounded ${block} animate-pulse`} />
                      <div className={`h-4 w-[35%] rounded ${block} animate-pulse`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
