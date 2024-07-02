"use client";
import { SpinnerRoundFilled } from "spinners-react";

export function ProcessingLoader({
  action,
  variant,
}: Readonly<{
  action: string;
  variant: "Task" | "Board";
}>) {
  return (
    <div className="fixed z-50 w-screen h-screen bg-slate-800/75 left-0">
      <div className="relative flex flex-col top-[100px] w-1/3 h-auto bg-white align-middle items-center mx-auto gap-1 justify-center rounded-full shadow-2xl shadow-slate-800/80 p-6">
        <div className="relative inline-block text-slate-600 text-md semibold ">
          {" "}
          {action} {variant}, Please wait...
        </div>
        <SpinnerRoundFilled
          size={40}
          thickness={100}
          speed={100}
          color="rgba(74, 57, 172, 0.71)"
        />
      </div>
    </div>
  );
}
