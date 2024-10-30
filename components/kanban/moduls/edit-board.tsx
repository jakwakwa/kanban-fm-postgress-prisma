"use client";
import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import EditTitleInputField from "./edit-title-inputfield";

import EditSubmitBtn from "./edit-submit-btn";
import ValidationMsg from "./validation-msg";
import { ColumnState, TaskState } from "@/types/data-types";

interface EditBoardProps {
  currentBoard: any;
  currentBoardId: any;
  setOpenEditBoardModul: any;
  handleEditBoard: any;
  boardLoading: boolean;
  setOpenBoardOptions: any;
  currentColumns: ColumnState[];
  tasks: TaskState[];
  darkMode: boolean;
}

const EditBoard = ({
  currentBoard,
  currentBoardId,
  setOpenEditBoardModul,
  handleEditBoard,
  boardLoading,
  setOpenBoardOptions,
  currentColumns,
  tasks,
  darkMode,
}: EditBoardProps) => {
  const [name, setName] = useState(currentBoard);

  const [newColumns, setNewColumns] = useState(currentColumns);

  // const handleAddColumn = () => {
  //   setNewColumns([...newColumns, { name: "", id: "" }]);
  // };

  const handleColumnChange = (index: number, value: string, id: string) => {
    const updatedColumns = currentColumns.map((column, i) => {
      if (i === index) {
        return {
          ...column,
          name: value, // Update tasks with matching status
          tasks: column.tasks.map((task) =>
            task.status === column.name ? { ...task, status: value } : task
          ),
        };
      }
      return column;
    });
    setNewColumns(updatedColumns);
  };
  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement, React.MouseEvent>
  ) => {
    e.preventDefault();
    setOpenEditBoardModul(false);
    setOpenBoardOptions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(newColumns);
    handleEditBoard(e, name, currentBoardId, newColumns);
  };

  return (
    <div className={`absolute w-[520px] mx-auto mt-[10%] ${darkMode ? 'bg-[#2B2C37] text-white border-[#3E3F4E]' : 'bg-white'} rounded-xl p-[32px] pb-[48px] h-auto shadow-lg left-[35%] z-30`}>
      <div className="text-xl font-bold mb-4">Edit Board</div>
      <Form.Root className="w-full" onSubmit={handleSubmit}>
        <EditTitleInputField
          name={name}
          setName={setName}
          variant={"Board"}
          darkMode={darkMode}
        />
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
                onChange={(e) =>
                  handleColumnChange(index, e.target.value, column.id)
                }
              />
            </Form.Control>
          </Form.Field>
        ))}

        <div className="flex flex-row gap-2">
          <EditSubmitBtn
            boardLoading={boardLoading}
            name={name}
            handleCancel={handleCancel}
          />
        </div>
        {!name && <ValidationMsg variant="Board" />}
      </Form.Root>
    </div>
  );
};

export default EditBoard;
