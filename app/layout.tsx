import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Milk & Cake | Little Treats, Big Celebrations",
  description: "Handmade custom cake pops for birthdays, showers, holidays, and every sweet celebration.",
  applicationName: "Milk & Cake",
  keywords: ["cake pops", "custom cake pops", "funfetti cake pops", "party desserts", "birthday treats"],
  openGraph: {
    title: "Milk & Cake",
    description: "Little treats. Big celebrations. Handmade custom cake pops for your sweetest moments.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Milk & Cake",
    description: "Little treats. Big celebrations.",
    images: [],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
