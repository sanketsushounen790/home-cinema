// app/layout.tsx
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import "./globals.css";
import ThemeProvider from "@/store/themeProvider";

export const metadata = {
  title: "MovieApp",
  description: "Your movie discovery app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
