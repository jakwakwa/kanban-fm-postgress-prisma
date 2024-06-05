import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

const CheckboxDemo = ({ title }: { title: string }) => (
  <form>
    <div className="flex items-center pl-2 pr-2 bg-violet-50 rounded-md">
      <Checkbox.Root
        className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center  rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
        defaultChecked
        id="c1"
      >
        <Checkbox.Indicator className="text-violet11">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="text-[15px] leading-none text-white" htmlFor="c1">
        <div className="p-3  rounded text-black text-xs font-bold">{title}</div>
      </label>
    </div>
  </form>
);

export default CheckboxDemo;
