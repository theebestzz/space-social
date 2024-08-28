import "@/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Space Social",
  description: "Space Social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
