"use client";

import { useLanguageStore } from "@/store/useLanguageStore";
import isCharsInString from "@/utils/isCharsInString";
import tmdbLanguages from "@/utils/tmdbLanguages";
import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
}

export default function LanguageSelect({ className }: Props) {
  const { language, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const current = tmdbLanguages.find((o) => o.iso_639_1 === language);

  const handleToggleOpen = () => {
    setOpen((v) => !v);
    setSearchTerm("");
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setSearchTerm("");
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative w-40 ${className}`}>
      {/* Selected */}

      {open ? (
        <div className="w-full flex items-center justify-between px-3 py-2 rounded border bg-base-100 hover:bg-base-200 cursor-pointer">
          <input
            type="text"
            placeholder="Search"
            className="w-[80%] h-[24px] focus:outline-none focus:ring-0 focus:border-base-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <span onClick={handleToggleOpen} className="text-xs cursor-pointer">
            ▼
          </span>
        </div>
      ) : (
        <div
          onClick={handleToggleOpen}
          className="w-full flex items-center justify-between px-3 py-2 rounded border bg-base-100 hover:bg-base-200 cursor-pointer"
        >
          <button className="w-[80%] cursor-pointer" type="button">
            <span className="h-full flex items-center gap-2">
              <span>{current?.name}</span>
            </span>
          </button>

          <span className="text-xs">▼</span>
        </div>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 bottom-full mb-1 w-40 h-auto max-h-[350px] overflow-y-auto rounded border bg-base-100 shadow">
          {tmdbLanguages
            .filter((opt) => isCharsInString(searchTerm, opt.english_name))
            .map((opt, index) => (
              <button
                key={index}
                onClick={() => {
                  setLanguage(opt.iso_639_1 as any);
                  setSearchTerm("");
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-base-200 cursor-pointer
                ${language === opt.iso_639_1 ? "bg-base-200 font-medium" : ""}
              `}
              >
                <span>{opt.english_name}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
