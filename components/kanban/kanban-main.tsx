"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/buttons/button";
import AddBoard from "./add-board";

const KanbanContainer = ({ boards }: { boards: any[] }) => {
  const [addBoardModul, setAddBoardModul] = useState(false);
  return (
    <>
      {addBoardModul && (
        <>
          {" "}
          <div
            className="absolute w-screen left-0 h-screen bg-black/50"
            onClick={() => setAddBoardModul(false)}
          ></div>
          <div className="absolute top-[15%] left-0 w-screen mx-auto z-10">
            <AddBoard setAddBoardModul={setAddBoardModul} />
          </div>
        </>
      )}
      <div className="h-full flex flex-col items-center justify-center align-middle">
        <div className="mb-4">Pick a board in the sidenav to get started</div>
        {/* <div onClick={() => setAddBoardModul(true)}>
          <Button href={"#"} isDisabled={false}>
            Or Add a Board
          </Button>
        </div> */}
      </div>
    </>
  );
};

export default KanbanContainer;
