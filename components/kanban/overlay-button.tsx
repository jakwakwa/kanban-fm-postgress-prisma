"use client";

import { Dispatch, SetStateAction } from "react";
interface OverlayBtnProp {
  setState: Dispatch<SetStateAction<any>>;
  isEditBoard?: boolean;
}
const OverlayButton = ({
  setState,
  isEditBoard,
}: OverlayBtnProp): JSX.Element => {
  return (
    <button
      className="w-full h-full left-0 m-0 p-0 bg-slate-700 bg-opacity-70 absolute z-20"
      onClick={() =>
        isEditBoard === false || isEditBoard === undefined
          ? setState((prevState: any) => ({
              ...prevState,
              openModul: false,
              addTaskMode: false,
            }))
          : setState(false)
      }
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (isEditBoard === false || isEditBoard === undefined) {
            setState((prevState: any) => ({
              ...prevState,
              openModul: false,
              addTaskMode: false,
            }));
          } else {
            setState(false);
          }
        }
      }}
      onTouchStart={() =>
        isEditBoard === false || isEditBoard === undefined
          ? setState((prevState: any) => ({
              ...prevState,
              openModul: false,
              addTaskMode: false,
            }))
          : setState(false)
      }
      style={{ cursor: "pointer" }}
    ></button>
  );
};

export default OverlayButton;
