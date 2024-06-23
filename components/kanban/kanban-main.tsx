"use client";

import { useState } from "react";
import AddBoard from "./add-board";

const KanbanContainer = ({ boards }: { boards: any[] }) => {
  const [addBoardModul, setAddBoardModul] = useState(false);
  return (
    <>
      {addBoardModul && (
        <>
          <button onClick={() => setAddBoardModul(false)}></button>
          <div className="absolute top-[15%] left-0 w-screen mx-auto z-10">
            <AddBoard setAddBoardModul={setAddBoardModul} />
          </div>
        </>
      )}
      <div className="h-full flex flex-col items-center justify-center align-middle">
        <div className="mb-4">Pick a board in the sidenav to get started</div>
      </div>
    </>
  );
};

export default KanbanContainer;
