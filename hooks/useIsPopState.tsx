"use client";

import { useEffect, useRef } from "react";

export function useIsPopState() {
  const isPopRef = useRef(false);

  useEffect(() => {
    const handler = () => {
      isPopRef.current = true;
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return isPopRef;
}
