import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata = {
  metadataBase: new URL("https://postgres-prisma.vercel.app"),
  title: "Kanban App",
  description:
    "A Kanban Next.js app with Vercel Postgres as the database and Prisma as the ORM",
};

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/assets/favicon-32x32.png" />
        <body className={jakarta.variable}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
