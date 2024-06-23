"use client";

import { StateT } from "@/types/data-types";
import { Dispatch, SetStateAction } from "react";
interface OverlayBtnProp {
  setState: Dispatch<SetStateAction<StateT>>;
}
const OverlayButton = ({ setState }: OverlayBtnProp): JSX.Element => {
  return (
    <button
      className="w-full h-full left-0 m-0 p-0 bg-slate-700 bg-opacity-70 fixed"
      onClick={() =>
        setState((prevState: any) => ({
          ...prevState,
          openModul: false,
          addTaskMode: false,
        }))
      }
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setState((prevState: any) => ({
            ...prevState,
            openModul: false,
            addTaskMode: false,
          }));
        }
      }}
      onTouchStart={() =>
        setState((prevState: any) => ({
          ...prevState,
          openModul: false,
          addTaskMode: false,
        }))
      }
      style={{ cursor: "pointer" }}
    ></button>
  );
};

export default OverlayButton;
