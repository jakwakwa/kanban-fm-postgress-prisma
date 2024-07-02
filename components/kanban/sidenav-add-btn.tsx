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
    setIsBoardAdding(true);
    setAddBoardModul(false);
  }
  return (
    <>
      <button
        className="absolute w-screen h-screen bg-black/50"
        onClick={handleAddBoard}
      ></button>
      <div className="absolute top-[15%] left-0 w-screen mx-auto z-10">
        <AddBoard setAddBoardModul={setAddBoardModul} />
      </div>
    </>
  );
};

export default SideNavAddBtn;
