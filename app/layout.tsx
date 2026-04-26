// app/layout.tsx
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import "./globals.css";
import ThemeProvider from "@/store/themeProvider";

export const metadata = {
  title: "HomeCinema",
  description: "Your movie discovery app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(() => {
  try {
    const raw = localStorage.getItem("theme-storage");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const theme = parsed?.state?.theme;
    if (theme === "light" || theme === "dark") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  } catch {}
})();
            `.trim(),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
