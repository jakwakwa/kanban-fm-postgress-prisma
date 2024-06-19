import Table from "@/components/ui/table/table";
import TablePlaceholder from "@/components/ui/table/table-placeholder";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? `/kanban/` : "/new-user";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-12 pb-4 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl">
        Kanban App
      </h1>
      <div className="w-screen h-[200px] flex justify-center items-center text-black">
        <div className="flex flex-col justify-center items-center w-full max-w-[600px] mx-auto">
          <p className="text-2xl font-bold mb-4 text-center">
            A portfolio project by Jaco Kotzee.
          </p>
          <div className="py-4">
            <Link href={href}>
              <button className="bg-black px-4 py-2 rounded-lg text-md text-white">
                {userId ? "Continue to Kanban" : "Get Started"}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Suspense fallback={<TablePlaceholder />}>
        <Table />
        <div className="pb-12"></div>
      </Suspense>

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Link
          href="https://github.com/jakwakwa/kanban-fm-postgress-prisma"
          target="_blank"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
  );
}
