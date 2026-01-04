"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRegionStore } from "@/store/useRegionStore";
import { useDropdownStore } from "@/store/useDropdownStore";
import countryRegions, { countryRegionsArray } from "@/utils/countryRegions";
import isCharsInString from "@/utils/isCharsInString";

interface Props {
  id: string;
}

export function RegionSelectDropdown({ id }: Props) {
  const { region, setRegion } = useRegionStore();
  const { openDropdownId, setOpenDropdownId } = useDropdownStore();
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const open = openDropdownId === id;
  const selected = countryRegions[region];

  // click outside → đóng đúng dropdown này
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        if (open) {
          setInputSearchTerm("");
          setOpenDropdownId(null);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpenDropdownId]);

  return (
    <div ref={ref} className="relative w-full min-w-[200px]">
      {/* trigger */}
      <button
        type="button"
        onClick={() => {
          setInputSearchTerm("");
          setOpenDropdownId(open ? null : id);
        }}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 border rounded bg-base-100 cursor-pointer"
      >
        <div className="flex items-center justify-center gap-2">
          <span>{selected?.name}</span>

          <img
            className="w-[22px] h-[17px] border"
            src={selected?.flag}
            alt="flag"
          />
        </div>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 max-h-[400px] overflow-y-auto border rounded bg-base-100 shadow">
          <div className="p-2">
            <input
              className="w-full px-3 py-2 border"
              placeholder="Search region..."
              value={inputSearchTerm}
              onChange={(e) => setInputSearchTerm(e.target.value)}
            />
          </div>

          {countryRegionsArray
            .filter((opt) => isCharsInString(inputSearchTerm, opt.name))
            .map((opt) => (
              <div
                key={opt.iso_3166_1}
                onClick={() => {
                  setRegion(opt.iso_3166_1);
                  setInputSearchTerm("");
                  setOpenDropdownId(null);
                }}
                className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-base-300
                ${opt.iso_3166_1 === region ? "bg-base-200 font-medium" : ""}`}
              >
                <span>{opt.name}</span>
                <img
                  className="w-[22px] h-[17px] border"
                  src={countryRegions[opt.iso_3166_1].flag}
                  alt="flag"
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
