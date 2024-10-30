"use client";
import { useRouter } from "next/navigation";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { SpinnerCircularSplit } from "spinners-react";
import useStore from "@/context/store";
import { setTimeout } from "timers";

interface AddBoardProps {
  handleAddBoard: any;
  setAddBoardModul: any;
}

const AddBoard = ({ setAddBoardModul }: AddBoardProps) => {
  const [name, setName] = useState("");
  const darkMode = useStore((state) => state.darkMode);

  const [newColumns, setNewColumns] = useState([{ name: "" }]);
  const [userId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setIsBoardAdding = useStore((state) => state.setIsBoardAdding);

  const handleCancel = () => {
    setAddBoardModul(false);
  };

  const handleAddColumn = () => {
    setNewColumns([...newColumns, { name: "" }]);
  };

  const handleColumnChange = (index: number, value: string) => {
    const updatedColumns = newColumns.map((column, i) => {
      if (i === index) {
        return { ...column, name: value };
      }
      return column;
    });
    setNewColumns(updatedColumns);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsBoardAdding(true);
    setLoading(true);

    try {
      const res = await fetch("/api/addBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId, columns: newColumns }),
      });

      if (res.ok) {
        setTimeout(() => {
          setIsBoardAdding(false);
        }, 4000);
        const newBoard = await res.json();
        router.push(
          `/kanban/board?board=${newBoard.data.name}&id=${newBoard.data.id}`
        );
        setAddBoardModul(false);

        setIsBoardAdding(false);
        router.refresh();
      } else {
        console.error("Failed to add board");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-[#2B2C37] text-white border-[#3E3F4E]' : 'bg-white'} absolute w-[520px] mx-auto mt-[0%] rounded-xl p-[32px] pb-[48px] h-auto shadow-lg left-[35%] z-40`}>
      <div className="text-xl font-bold mb-4">Add New Board</div>
      <Form.Root className="w-full" onSubmit={handleSubmit}>
        <Form.Field className="grid mb-[10px]" name="title">
          <div className="flex items-baseline justify-between">
            <Form.Label className={`text-[15px] font-medium leading-[35px] ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
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
              className={`box-border w-full ${darkMode ? 'bg-[#2B2C37] text-white border-[#3E3F4E]' : 'bg-slate-100 text-slate-600'} shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_#9443f7] selection:color-white selection:bg-blackA6`}
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
        {newColumns.map((column, index) => (
          <Form.Field
            className="grid mb-[10px]"
            key={index}
            name={`column-${index}`}
          >
            <div className="flex items-baseline justify-between">
              <Form.Label className={`text-[15px] font-medium leading-[35px] ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                Status column name
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter Status column name
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className={`box-border w-full ${darkMode ? 'bg-[#2B2C37] text-white border-[#3E3F4E]' : 'bg-slate-100 text-slate-600'} shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_#9443f7] selection:color-white selection:bg-blackA6`}
                required
                type="text"
                value={column.name}
                onChange={(e) => handleColumnChange(index, e.target.value)}
              />
            </Form.Control>
          </Form.Field>
        ))}
        <button
          onClick={handleAddColumn}
          className="mb-4 text-sm text-blue-500 hover:underline"
        >
          Add another column
        </button>
        <div className="flex flex-row gap-2">
          <Form.Submit asChild>
            <button
              className={`mt-6 flex justify-center text-center w-full h-10 bg-indigo-500 hover:bg-indigo-700 rounded-2xl align-middle items-center disabled:bg-indigo-200 disabled:cursor-not-allowed ${
                loading ? "cursor-not-allowed animate-pulse" : "cursor-pointer"
              }`}
              disabled={
                name.length === 0 ||
                newColumns.some((column) => column.name === "")
              }
              style={{
                transition: "200ms ease-in",
              }}
            >
              <div className="text-white text-xs font-bold">
                <div className="flex flex-row gap-2 align-middle items-center">
                  {!loading ? "Save Changes" : "Saving"}
                  {loading && (
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
            className="mt-6 flex justify-center text-center h-10 rounded-2xl align-middle items-center cursor-pointer w-40"
            style={{
              transition: "200ms ease-in",
            }}
          >
            <button
              className={`text-xs font-bold hover:underline ${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}
              onClick={handleCancel}
            >
              <div className="flex flex-row gap-2 align-middle items-center text-slate-500 text-xs uppercase tracking-widest">
                Cancel
              </div>
            </button>
          </div>
        </div>
        {!name && (
          <div className="text-[#6866e2] border border-[#4172cd65] border-1 px-2 py-1 inline-block text-[8px] rounded w-[70%] mt-4">
            * Please enter a board title to enable save
          </div>
        )}
      </Form.Root>
    </div>
  );
};

export default AddBoard;
