"use client";

import { useEffect } from "react";
import { useThemeStore } from "./themeStore";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
