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

export function DrawerRegionSelect({ id }: Props) {
  const { region, setRegion } = useRegionStore();
  const { openDropdownId, setOpenDropdownId } = useDropdownStore();
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const open = openDropdownId === id;
  const selected = countryRegions[region];

  useEffect(() => {
    if (open && dropdownRef.current) {
      const el = dropdownRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [open]);

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
    <div ref={ref} className="relative w-auto min-w-[200px]">
      {/* trigger */}
      {open ? (
        <div className="w-full flex items-center justify-between px-3 py-2 rounded border bg-base-100 hover:bg-base-200 cursor-pointer">
          <input
            className="w-[80%] h-[24px] focus:outline-none focus:ring-0 focus:border-base-300"
            placeholder="Search region..."
            value={inputSearchTerm}
            onChange={(e) => setInputSearchTerm(e.target.value)}
          />

          <ChevronDown
            size={18}
            className={`transition ${open ? "rotate-180" : ""}`}
            onClick={() => {
              setInputSearchTerm("");
              setOpenDropdownId(open ? null : id);
            }}
          />
        </div>
      ) : (
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
      )}

      {/* dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-50 bottom-full mb-1 w-full max-h-[400px] overflow-y-auto border rounded bg-base-100 shadow"
        >
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
