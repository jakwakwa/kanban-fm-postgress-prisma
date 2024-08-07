"use client";
import { useSearchParams } from "next/navigation";

const KanbanHeader = () => {
  const pathname = useSearchParams();
  const headerTitle = pathname.get("board");
  return (
    <div
      className={`fixed w-full h-[80px] bg-white text-kblack-main px-4 border-b z-10`}
    >
      <div className="w-full h-full flex flex-row items-center justify-between">
        <div className="w-full">
          <h1 className="pl-8 font-bold text-[24px]">{headerTitle}</h1>
        </div>
      </div>
    </div>
  );
};

export default KanbanHeader;
