"use client";

import { TaskPayload } from "@/types/data-types";
import * as Form from "@radix-ui/react-form";
import { Dispatch, SetStateAction } from "react";

interface EditInputFieldProps {
  name: string;
  setName: Dispatch<SetStateAction<string | TaskPayload>>;
  variant: "Board" | "Task";
  fullObj?: TaskPayload;
  darkMode: boolean;
}

function EditTitleInputField({
  name,
  setName,
  fullObj,
  variant,
  darkMode,
}: Readonly<EditInputFieldProps>) {
  return (
    <Form.Field className="grid mb-[10px]" name="title">
      <div className="flex items-baseline justify-between">
        <Form.Label className={`${darkMode ? 'text-[#828FA3]' : 'text-slate-500'} text-[15px] font-medium leading-[35px]`}>
          {variant} Title
        </Form.Label>
        <Form.Message
          className="text-[13px] text-white opacity-[0.8]"
          match="valueMissing"
        >
          Please enter {variant} title
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className={`${darkMode ? 'bg-[#2B2C37] text-white border-[#3E3F4E]' : 'bg-slate-100 border-slate-400'} border box-border w-full shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_#9443f7] selection:color-white selection:bg-blackA6`}
          required
          type="text"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            const tit = e.target.value;

            fullObj !== undefined || fullObj === null
              ? setName({
                  ...fullObj,
                  title: tit,
                })
              : setName(tit);
          }}
        />
      </Form.Control>
    </Form.Field>
  );
}

export default EditTitleInputField;
