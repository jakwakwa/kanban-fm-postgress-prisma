"use client";
import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import EditTitleInputField from "./edit-title-inputfield";

import EditSubmitBtn from "./edit-submit-btn";
import ValidationMsg from "./validation-msg";
import { ColumnState } from "@/types/data-types";

interface EditBoardProps {
  currentBoard: any;
  currentBoardId: any;
  setOpenEditBoardModul: any;
  handleEditBoard: any;
  boardLoading: boolean;
  setOpenBoardOptions: any;
  currentColumns: ColumnState[];
}

const EditBoard = ({
  currentBoard,
  currentBoardId,
  setOpenEditBoardModul,
  handleEditBoard,
  boardLoading,
  setOpenBoardOptions,
  currentColumns,
}: EditBoardProps) => {
  const [name, setName] = useState(currentBoard);
  const getColumnNames = () => {
    // Get Column names from currentColumns and return an array of Objects with {name: string}
    return currentColumns.map((column) => ({
      name: column.name,
      id: column.id,
    }));
  };
  const existingCols = getColumnNames();
  const [newColumns, setNewColumns] = useState(existingCols);

  const handleAddColumn = () => {
    setNewColumns([...newColumns, { name: "", id: "" }]);
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
  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement, React.MouseEvent>
  ) => {
    e.preventDefault();
    setOpenEditBoardModul(false);
    setOpenBoardOptions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    handleEditBoard(e, name, currentBoardId, newColumns);
  };

  return (
    <div className="absolute w-[520px] mx-auto mt-[10%] bg-white rounded-xl p-[32px] pb-[48px] h-auto shadow-lg left-[35%] z-30">
      <div className="text-xl font-bold mb-4">Edit Board</div>
      <Form.Root className="w-full" onSubmit={handleSubmit}>
        <EditTitleInputField name={name} setName={setName} variant={"Board"} />
        {newColumns.map((column, index) => (
          <Form.Field
            className="grid mb-[10px]"
            key={index}
            name={`column-${index}`}
          >
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-slate-500">
                Column Name
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter column name
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-slate-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_#9443f7] selection:color-white selection:bg-blackA6"
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
