import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

const CheckboxDemo = ({ title }: { title: string }) => (
  <form>
    <div className="flex items-center pl-2 pr-2 bg-indigo-50  hover:bg-violet4 rounded-md">
      <Checkbox.Root
        className="shadow-blackA4 hover:bg-violet3 flex w-4 h-4 appearance-none items-center justify-center  rounded-sm  border-[1px] border-slate-400 bg-white outline-none focus:shadow-[0_0_0_1px_black]"
        id={title}
      >
        <Checkbox.Indicator className="text-violet11">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="text-[15px] leading-none text-white" htmlFor={title}>
        <div className="p-3 rounded text-black text-xs font-bold">{title}</div>
      </label>
    </div>
  </form>
);

export default CheckboxDemo;
