"use client";
import { MouseEvent, SetStateAction, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { SpinnerCircularSplit } from "spinners-react";
import EditTitleInputField from "./edit-title-inputfield";
import { TaskPayload } from "@/types/data-types";
import EditSubmitBtn from "./edit-submit-btn";

interface EditBoardProps {
  currentBoard: any;
  currentBoardId: any;
  setOpenEditBoardModul: any;
  handleEditBoard: any;
  boardLoading: boolean;
}

const EditBoard = ({
  currentBoard,
  currentBoardId,
  setOpenEditBoardModul,
  handleEditBoard,
  boardLoading,
}: EditBoardProps) => {
  const [name, setName] = useState(currentBoard);

  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement, React.MouseEvent>
  ) => {
    e.preventDefault();
    setOpenEditBoardModul(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleEditBoard(e, name, currentBoardId);
  };

  return (
    <div className="absolute w-[520px] mx-auto mt-[0%] bg-white rounded-xl p-[32px] pb-[48px] h-auto shadow-lg left-[35%]">
      <div className="text-xl font-bold mb-4">Edit Board</div>
      <Form.Root className="w-full" onSubmit={handleSubmit}>
        <EditTitleInputField name={name} setName={setName} variant={"Board"} />
        <div className="flex flex-row gap-2">
          <EditSubmitBtn
            boardLoading={boardLoading}
            name={name}
            handleCancel={handleCancel}
          />
        </div>
        {!name && (
          <div className="text-[#6866e2] border border-[#4172cd65] border-1 px-2 py-1 inline-block text-[8px] rounded w-[70%] mt-4">
            * Please enter a board title to enable save{" "}
          </div>
        )}
      </Form.Root>
    </div>
  );
};

export default EditBoard;
