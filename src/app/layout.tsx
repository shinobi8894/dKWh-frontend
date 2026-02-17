import type { Metadata } from "next";
import "@/app/globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "DTR Platform – Design Landing Page",
  description:
    "Trade Delivery Rights, Not Just Electrons. The first platform for trading delivery transaction rights on energy grids.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
