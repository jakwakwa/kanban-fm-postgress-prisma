import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import ExpandingArrow from '@/components/expanding-arrow'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">

      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Kanban App
      </h1>
      <Suspense fallback={<TablePlaceholder />}>
        <Table />
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
          href="https://github.com/vercel/examples/tree/main/storage/postgres-prisma"
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
  )
}
