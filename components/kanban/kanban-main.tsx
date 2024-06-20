"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/buttons/button";
import AddBoard from "./add-board";

const KanbanContainer = ({ boards }: { boards: any[] }) => {
  const [addBoardModul, setAddBoardModul] = useState(false);
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center align-middle">
        <div className="mb-4">Pick a board on the sidenav to get started</div>
        <button onClick={() => setAddBoardModul(true)}>
          <Button href={"#"} isDisabled={false}>
            Or Add a Board
          </Button>
        </button>
        {addBoardModul && <AddBoard setAddBoardModul={setAddBoardModul} />}
      </div>
    </>
  );
};

export default KanbanContainer;
