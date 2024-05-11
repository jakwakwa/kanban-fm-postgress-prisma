"use client";
import { useSearchParams } from "next/navigation";
import Button from "./button";

const KanbanHeader = () => {
  const pathname = useSearchParams();
  const headerTitle = pathname.get("board");
  return (
    <div
      className={`fixed w-full h-[80px] bg-white text-kblack-main px-4 border-b`}
    >
      <div className="w-full h-full flex flex-row items-center justify-between">
        <div className="w-full">
          <h1 className="pl-[330px] font-bold text-[24px]">{headerTitle}</h1>
        </div>
        <div className="w-[200px] flex justify-end">
          <Button href={"#"} variant="secondary">
            + Add New Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KanbanHeader;
