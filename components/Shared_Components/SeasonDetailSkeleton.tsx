"use client";

import React from "react";

export default function SeasonDetailSkeleton() {
  const episodePlaceholders = Array.from({ length: 5 });

  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-base-100">
      <div className="w-[80%] h-auto flex justify-start items-start bg-base-300 shadow-lg gap-4 mt-8">
        <div className="relative">
          <div className="w-[260px] h-[390px] rounded-lg shadow-lg bg-base-200 animate-pulse" />

          <div className="absolute right-[20px] bottom-[-17px] w-[50px] h-[50px] rounded-full bg-base-200 animate-pulse" />
        </div>

        <div className="w-[calc(100%-200px)] flex flex-col justify-center items-start px-4 pb-3">
          <div className="flex justify-center items-end gap-3 mt-4">
            <div className="h-7 w-64 rounded bg-base-200 animate-pulse" />
            <div className="h-7 w-20 rounded bg-base-200 animate-pulse" />
            <div className="h-6 w-28 rounded bg-base-200 animate-pulse" />
          </div>

          <div className="w-full mt-4 space-y-3">
            <div className="h-5 w-[95%] rounded bg-base-200 animate-pulse" />
            <div className="h-5 w-[90%] rounded bg-base-200 animate-pulse" />
            <div className="h-5 w-[80%] rounded bg-base-200 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-4 my-8">
        <div className="w-[80%] flex flex-col gap-6">
          {episodePlaceholders.map((_, idx) => (
            <div
              key={idx}
              className="w-full rounded-xl overflow-hidden shadow-xl bg-base-300"
            >
              <div className="flex flex-col md:flex-row gap-4 p-4">
                <div className="w-full md:w-56 aspect-video rounded-lg bg-base-200 animate-pulse" />

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="h-6 w-[70%] rounded bg-base-200 animate-pulse" />
                    <div className="flex gap-4 mt-2">
                      <div className="h-4 w-24 rounded bg-base-200 animate-pulse" />
                      <div className="h-4 w-16 rounded bg-base-200 animate-pulse" />
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="h-4 w-[95%] rounded bg-base-200 animate-pulse" />
                      <div className="h-4 w-[80%] rounded bg-base-200 animate-pulse" />
                    </div>
                  </div>

                  <div className="mt-4 h-4 w-20 rounded bg-base-200 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

