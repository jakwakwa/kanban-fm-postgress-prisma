"use client";
import { Dispatch, SetStateAction } from "react";
import AddBoard from "./add-board";
import useStore from "@/context/store";
interface SideNavAddProps {
  setAddBoardModul: Dispatch<SetStateAction<boolean>>;
}
const SideNavAddBtn = ({ setAddBoardModul }: SideNavAddProps): JSX.Element => {
  const setIsBoardAdding = useStore((state) => state.setIsBoardAdding);

  function handleAddBoard() {
    console.log("AAAA");
    setIsBoardAdding(false);
    setAddBoardModul(false);
  }
  return (
    <>
      <button
        className="absolute w-screen h-screen bg-black/50 z-30"
        onClick={() => setAddBoardModul(false)}
      ></button>
      <div className="absolute top-[15%] left-0 w-screen mx-auto z-30">
        <AddBoard
          handleAddBoard={handleAddBoard}
          setAddBoardModul={setAddBoardModul}
        />
      </div>
    </>
  );
};

export default SideNavAddBtn;
