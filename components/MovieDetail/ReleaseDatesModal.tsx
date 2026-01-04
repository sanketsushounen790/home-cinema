"use client";

import { ReactNode, useEffect } from "react";

interface ReleaseDatesModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ReleaseDatesModal({
  open,
  onClose,
  children,
}: ReleaseDatesModalProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-base-100 p-4 rounded-xl shadow-xl w-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
