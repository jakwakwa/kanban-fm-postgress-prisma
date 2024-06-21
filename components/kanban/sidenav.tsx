"use client";
import { useRouter, useSearchParams } from "next/navigation";
import useStore from "@/context/store";
import { SignOutButton } from "@clerk/nextjs";
import { PowerIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Logo from "../ui/logo";
import { useState } from "react";
import { SpinnerCircular } from "spinners-react";
import AddBoard from "./add-board";
import Button from "../ui/buttons/button";

export default function SideNav({ boards }: { boards: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentBoardName = searchParams.get("board");
  const [boardLoading, setBoardLoading] = useState(false);
  const [addBoardModul, setAddBoardModul] = useState(false); // Added useState for addBoardModul

  const addBoard = useStore((state) => state.addBoard);
  const addBoardId = useStore((state) => state.addBoardId);
  addBoard(boards);
  const setLoader = useStore((state) => state.setLoader);

  async function handleBoardsStore(selectedBoardId: any) {
    addBoardId(selectedBoardId);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setBoardLoading(false);
    }, 5000);
  }

  return (
    <>
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
          {boardLoading && currentBoardName === null ? (
            <div className="pl-4 flex flex-row gap-2">
              <div className="text-xs text-violet-400 animate-pulse pb-2">
                {"Loading board... "}
              </div>
              <SpinnerCircular color="indigo" size={20} />
            </div>
          ) : null}
          <div className="text-black">
            <div className="flex flex-col w-full">
              {boards?.map((board: { name: any; id: any }, i: number) => (
                <div className="text-black" key={i}>
                  {currentBoardName !== board.name ? (
                    <Link
                      href={{
                        pathname: `/kanban/board/`,
                        query: { board: board.name, id: board.id },
                      }}
                      onClick={() => {
                        setBoardLoading(true);
                        if (
                          currentBoardName !== board.name &&
                          currentBoardName !== null
                        ) {
                          setLoader(true);
                          handleBoardsStore(board.id);
                        }
                        if (
                          currentBoardName !== board.name &&
                          currentBoardName === null
                        ) {
                          handleBoardsStore(board.id);
                        }
                      }}
                      key={board.name}
                      className={`flex w-[90%] h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium   md:flex-none md:justify-start md:p-0 md:px-0 transition-colors duration-75 ease-in-out ${
                        boardLoading && "cursor-not-allowed"
                      } rounded-r-full ${
                        currentBoardName === board.name
                          ? "bg-violet-500 text-indigo-100 hover:bg-violet-500 hover:text-indigo-100 cursor-not-allowed"
                          : "bg-white hover:bg-violet-100 hover:text-indigo-700"
                      }`}
                    >
                      <ViewColumnsIcon className="w-6 ml-4" />

                      <div className="flex relative flex-row md:block ml-4 w-full">
                        <div className="w-[80%]">
                          {board?.name}{" "}
                          <div className="absolute top-0 right-[20px] w-[10px]">
                            {currentBoardName === board.name && boardLoading ? (
                              <SpinnerCircular color="white" size={20} />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className={`flex w-[90%] h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium   md:flex-none md:justify-start md:p-0 md:px-0 transition-colors duration-75 ease-in-out ${
                        boardLoading && "cursor-not-allowed"
                      } rounded-r-full ${
                        currentBoardName === board.name
                          ? "bg-violet-500 text-indigo-100 hover:bg-violet-500 hover:text-indigo-100 cursor-not-allowed"
                          : "bg-white hover:bg-violet-100 hover:text-indigo-700"
                      }`}
                    >
                      <ViewColumnsIcon className="w-6 ml-4" />

                      <div className="flex relative flex-row md:block ml-4 w-full">
                        <div className="flex items-center w-[80%]">
                          {board?.name}
                          <div className="absolute right-[20px] rounded-full bg-violet-100 h-2 w-2 p-1"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="pl-3 mt-4">
              <button onClick={() => setAddBoardModul(true)}>
                <Button href={"#"} isDisabled={false}>
                  Add New Board
                </Button>
              </button>
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
      {addBoardModul && (
        <>
          <div
            className="absolute w-screen h-screen bg-black/50"
            onClick={() => setAddBoardModul(false)}
          ></div>
          <div className="absolute top-[15%] left-0 w-screen mx-auto z-10">
            <AddBoard setAddBoardModul={() => setAddBoardModul(true)} />
          </div>
        </>
      )}
    </>
  );
}
