"use client";
import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { SpinnerCircularSplit } from "spinners-react";

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
        <Form.Field className="grid mb-[10px]" name="title">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-slate-500">
              Board Title
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="valueMissing"
            >
              Please enter board title
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-slate-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_#9443f7] selection:color-white selection:bg-blackA6"
              required
              type="text"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>
        <div className="flex flex-row gap-2">
          <Form.Submit asChild>
            <button
              className={`mt-6 flex justify-center text-center w-full h-10 bg-indigo-500 hover:bg-indigo-700 rounded-2xl align-middle items-center disabled:bg-indigo-200 disabled:cursor-not-allowed ${
                boardLoading
                  ? "cursor-not-allowed animate-pulse"
                  : "cursor-pointer"
              }`}
              disabled={name.length === 0}
              style={{
                transition: "200ms ease-in",
              }}
            >
              <div className="text-white text-xs font-bold">
                <div className="flex flex-row gap-2 align-middle items-center">
                  {!boardLoading ? "Save Changes" : "Saving"}
                  {boardLoading && (
                    <SpinnerCircularSplit
                      size={20}
                      thickness={100}
                      speed={100}
                      color="rgba(255, 255, 255, 1)"
                      secondaryColor="rgba(255, 255, 255, 0.17)"
                    />
                  )}
                </div>
              </div>
            </button>
          </Form.Submit>
          <div
            className="mt-6 flex justify-center text-center h-10 rounded-2xl align-middle items-center cursor-pointer w-40 text-black"
            style={{
              transition: "200ms ease-in",
            }}
          >
            <button
              className="text-black text-xs font-bold hover:text-gray hover:underline"
              // @ts-ignore
              onClick={(e) => handleCancel(e)}
            >
              <div className="flex flex-row gap-2 align-middle items-center text-slate-500 text-xs uppercase tracking-widest">
                Cancel
              </div>
            </button>
          </div>
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
