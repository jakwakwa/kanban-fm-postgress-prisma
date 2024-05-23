"use client";
import { useEffect } from "react";
import useStore from "@/context/store";
import { useRouter } from "next/navigation";
import { BoardsData } from "@/types/data-types";

const KanbanPage = () => {
  const isEmpty = true;
  const { boards } = useStore() as BoardsData;
  const router = useRouter();
  useEffect(() => {
    if (boards.length > 0)
      router.push(`/kanban/board?board=${boards[0].name}`, { scroll: false });
  }, [boards, router]);

  return (
    <>
      {isEmpty && (
        <div className="h-full flex flex-col items-center justify-center align-middle">
          <div className="mb-4">Pick a board to get started.</div>
        </div>
      )}
    </>
  );
};

export default KanbanPage;
