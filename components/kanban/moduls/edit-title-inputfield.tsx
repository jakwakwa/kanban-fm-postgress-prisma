"use client";

import { TaskPayload } from "@/types/data-types";
import * as Form from "@radix-ui/react-form";
import { Dispatch, SetStateAction } from "react";
import { commonClasses } from "../kanban-grid-styles";

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
          className={`${darkMode ? commonClasses.input.dark : commonClasses.input.base}`}
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
