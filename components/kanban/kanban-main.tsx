"use client";

import { useState } from "react";
import AddBoard from "./add-board";
import useStore from "@/context/store";

const KanbanContainer = ({ boards }: { boards: any[] }) => {
  const setIsBoardAdding = useStore((state) => state.setIsBoardAdding);
  const [addBoardModul, setAddBoardModul] = useState(false);
  function handleAddBoard() {
    setIsBoardAdding(true);
    setAddBoardModul(false);
  }
  return (
    <>
      {addBoardModul && (
        <>
          <button onClick={() => setAddBoardModul(false)}></button>
          <div className="absolute top-[15%] left-0 w-screen mx-auto z-30">
            <AddBoard
              setAddBoardModul={handleAddBoard}
              handleAddBoard={handleAddBoard}
            />
          </div>
        </>
      )}
      <div className="w-full h-full flex flex-col items-center justify-center align-middle">
        {boards.length === 0 ? (
          <div className="mb-4">
            Add a board from the side panel to get started
          </div>
        ) : (
          <div className="mb-4">
            Select an existing board or add a new board from the side panel
          </div>
        )}
      </div>
    </>
  );
};

export default KanbanContainer;
