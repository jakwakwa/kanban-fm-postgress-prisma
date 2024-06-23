"use client";
import { SpinnerRoundFilled } from "spinners-react";

export const BoardLoadSpinner = (
  <div
    className="absolute w-full left-0 m-0 p-0 h-[100%]"
    style={{ background: "rgba(72, 54, 113, 0.2)" }}
  >
    <div className="absolute top-[40%] left-[50%] w-full mx-auto rounded-md p-[32px] pb-[48px] h-screen">
      <div className="flex items-center align-middle flex-row h-[50px] gap-0 animate-pulse">
        <div className="h-[25px] w-[120px] p-0 m-0 text-sm leading-1 text-indigo-500">
          Loading board...
        </div>
        <div className="h-[50px] w-[50px]">
          <SpinnerRoundFilled
            size={50}
            thickness={100}
            speed={100}
            color="rgba(74, 57, 172, 0.71)"
          />
        </div>
      </div>
    </div>
  </div>
);
