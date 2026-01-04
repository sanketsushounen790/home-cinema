"use client";

import { useEffect, MouseEvent, ReactNode } from "react";

interface ModalPopupProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalPopup({
  open,
  onClose,
  children,
}: ModalPopupProps) {
  // Disable body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed h-screen inset-0 z-500 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-base-300 rounded-xl p-6 w-[90%] max-w-md shadow-xl animate-scaleIn"
        onClick={stopPropagation}
      >
        {children}
      </div>
    </div>
  );
}
