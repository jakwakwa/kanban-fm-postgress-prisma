"use client";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import * as Form from "@radix-ui/react-form";
import FormLabel from "./form-label";

const AddBoard = ({ setAddBoardModul }: any) => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(""); // You need to set the userId appropriately
  const router = useRouter();

  const handleCancel = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setAddBoardModul(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/addBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId }),
      });

      if (res.ok) {
        const newBoard = await res.json();

        router.push(
          `kanban/board?board=${newBoard.data.name}&id=${newBoard.data.id}`
        );
      } else {
        console.error("Failed to add board");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="absolute w-[520px] mx-auto mt-[0%] bg-white rounded-xl p-[32px] pb-[48px] h-auto shadow-lg left-[35%]">
      <div className="text-xl font-bold mb-4">Add New Board</div>
      <Form.Root className="w-full">
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
        <FormLabel isLabel={false}>Columns</FormLabel>
        <div className="w-full h-12 relative">
          <div className="w-full h-10 left-0 top-[23px]">
            <div className="w-full flex-row flex justify-between align-middle items-center">
              <div className="flex justify-between align-middle items-center w-full text-gray-950 text-xs font-medium leading-snug  left-0 top-0  bg-white rounded border border-slate-400/opacity-25 h-10 p-4">
                Todo
              </div>
              <div className="flex align-middle items-center w-4.5 h-1.5 p-4">
                x
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-12 relative">
          <div className="w-full h-10 left-0 top-[23px]">
            <div className="w-full flex-row flex justify-between align-middle items-center">
              <div className="flex justify-between align-middle items-center w-full text-gray-950 text-xs font-medium leading-snug  left-0 top-0  bg-white rounded border border-slate-400/opacity-25 h-10 p-4">
                Doing
              </div>
              <div className="flex align-middle items-center w-4.5 h-1.5 p-4">
                x
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-12 relative">
          <div className="w-full h-10 left-0 top-[23px]">
            <div className="w-full flex-row flex justify-between align-middle items-center">
              <div className="flex justify-between align-middle items-center w-full text-gray-950 text-xs font-medium leading-snug  left-0 top-0  bg-white rounded border border-slate-400/opacity-25 h-10 p-4">
                Done
              </div>
              <div className="flex align-middle items-center w-4.5 h-1.5 p-4">
                x
              </div>
            </div>
          </div>
        </div>

        <div className="h-10 relative w-full bg-indigo-500/10 rounded-2xl hover:bg-indigo-500/20 transition-colors ease-in delay-150 cursor-pointer">
          <div className="h-10 flex justify-center align-middle items-center text-center text-indigo-500 text-xs font-bold font-['Plus Jakarta Sans'] leading-snug">
            + Add New Column
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Submit asChild>
            <div
              className="mt-6 flex justify-center text-center w-full h-10 bg-indigo-500 hover:bg-indigo-700 rounded-2xl align-middle items-center cursor-pointer"
              style={{
                transition: "200ms ease-in",
              }}
            >
              <button
                className="text-white text-xs font-bold  "
                onClick={handleSubmit}
              >
                <div className="flex flex-row gap-2 align-middle items-center">
                  Add
                </div>
              </button>
            </div>
          </Form.Submit>
          <div
            className="mt-6 flex justify-center text-center h-10 rounded-2xl align-middle items-center cursor-pointer w-40 text-black"
            style={{
              transition: "200ms ease-in",
            }}
          >
            <button
              className="text-black text-xs font-bold hover:text-gray hover:underline"
              onClick={(e) =>
                // @ts-ignore
                handleCancel(e)
              }
            >
              <div className="flex flex-row gap-2 align-middle items-center">
                Cancel
              </div>
            </button>
          </div>
        </div>
      </Form.Root>
    </div>
  );
};

export default AddBoard;
