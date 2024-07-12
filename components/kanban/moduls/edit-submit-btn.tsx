"use client";
import * as Form from "@radix-ui/react-form";
import { SpinnerCircularSplit } from "spinners-react";

interface EditSubmitBtnProps {
  boardLoading: boolean;
  name?: string; // Make name optional
  handleCancel: any;
}

function EditSubmitBtn({
  boardLoading,
  name = "", // Provide a default value for name
  handleCancel,
}: Readonly<EditSubmitBtnProps>) {
  return (
    <div className="flex flex-row gap-2">
      <Form.Submit asChild>
        <button
          className={`mt-6 flex justify-center text-center w-full h-10 bg-indigo-500 hover:bg-indigo-700 rounded-2xl align-middle items-center disabled:bg-indigo-200 disabled:cursor-not-allowed ${
            boardLoading ? "cursor-not-allowed animate-pulse" : "cursor-pointer"
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
          onClick={(e) => handleCancel(e)}
        >
          <div className="flex flex-row gap-2 align-middle items-center text-slate-500 text-xs uppercase tracking-widest">
            Cancel
          </div>
        </button>
      </div>
    </div>
  );
}

export default EditSubmitBtn;
