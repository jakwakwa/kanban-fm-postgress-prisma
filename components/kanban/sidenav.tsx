"use client";
import { useRouter, useSearchParams } from "next/navigation";
import useStore from "@/context/store";
import { SignOutButton } from "@clerk/nextjs";
import { PowerIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Logo from "../ui/logo";

export default function SideNav({ boards }: { boards: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentBoardName = searchParams.get("board");

  // @ts-ignore
  const addBoard = useStore((state) => state.addBoard);
  // @ts-ignore
  const addBoardId = useStore((state) => state.addBoardId);
  addBoard(boards);
  // @ts-ignore
  const setLoader = useStore((state) => state.setLoader);

  async function handleBoardsStore(selectedBoardId: any) {
    await addBoardId(selectedBoardId);
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  }

  return (
    <div className="fixed w-[300px] z-1 flex h-full flex-col  py-0 md:px-0 bg-white border-r">
      <Link
        className="mb-2 flex h-28 items-start justify-start rounded-md bg-white p-4 md:pt-8 md:h-28"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-0">
        <div className="px-0 pb-5 pl-4 uppercase tracking-widest text-sm font-medium text-kgray-text">
          All boards ({boards.length})
        </div>
        <div className="text-black">
          <div className="flex flex-col w-full">
            {boards?.map((board: { name: any; id: any }, i: number) => (
              <div className="text-black" key={i}>
                <Link
                  href={{
                    pathname: `/kanban/board/`,
                    query: { board: board.name, id: board.id },
                  }}
                  onClick={() => handleBoardsStore(board.id)}
                  key={board.name}
                  className={`flex w-[90%] h-[48px] grow items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium hover:bg-violet-100 hover:text-indigo-600 md:flex-none md:justify-start md:p-0 md:px-0 rounded-r-full ${
                    currentBoardName === board.name
                      ? "bg-indigo-600 text-indigo-100 hover:bg-indigo-600 hover:text-white"
                      : ""
                  }`}
                >
                  <ViewColumnsIcon className="w-6 ml-4" />
                  <p className="hidden md:block ml-4"> {board?.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 bg-white hover:bg-violet-100 hover:text-violet-600 border-t-2">
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
