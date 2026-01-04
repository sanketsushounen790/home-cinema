"use client";

import { useEffect } from "react";

interface EpisodeGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function EpisodeGroupModal({
  isOpen,
  onClose,
  children,
}: EpisodeGroupModalProps) {
  // Lock scroll body khi mở
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/40"
      // overlay nhẹ hơn: bg-black/20
      onClick={onClose}
    >
      <div
        className="bg-base-100 rounded-xl shadow-xl p-6 max-h-[90vh] h-auto overflow-y-auto
                   w-[min(90%,_1000px)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút X */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50
                     text-white flex items-center justify-center text-lg font-bold cursor-pointer"
        >
          ✕
        </button>

        <div className="py-2">{children}</div>
      </div>
    </div>
  );
}
