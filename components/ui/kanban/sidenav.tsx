"use client";
import Link from "next/link";
import NavLinks from "@/components/ui/kanban/nav-links";

import {
  LinkIcon,
  PowerIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import Logo from "../logo";
import { SignOutButton } from "@clerk/nextjs";
import useStore from "@/context/store";

export default function SideNav() {
  // @ts-ignore
  const { boards } = useStore(); // Access the store's state
  console.log("boards", boards);
  return (
    <div className="fixed w-[300px] z-1 flex h-full flex-col px-3 py-0 md:px-0 bg-white border-r">
      <Link
        className="mb-2 flex h-20 items-start justify-start rounded-md bg-white p-4 md:pt-8 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-0">
        <div className="px-4 pb-2">All boards ({boards.length})</div>
        <div className="text-black">
          <div className="flex flex-col w-full">
            {boards?.map((board: { name: any }, i: number) => (
              <div className="text-black" key={i}>
                <a
                  key={board.name}
                  href={"#"}
                  className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium hover:bg-violet-100 hover:text-violet-600 md:flex-none md:justify-start md:p-2 md:px-3"
                >
                  <ViewColumnsIcon className="w-6" />
                  <p className="hidden md:block"> {board?.name}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 bg-white hover:bg-violet-100 hover:text-violet-600">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">
              <SignOutButton />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
