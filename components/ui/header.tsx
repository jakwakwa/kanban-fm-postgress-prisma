"use client";
import { useSearchParams } from "next/navigation";
import useStore from "@/context/store";
const KanbanHeader = () => {
  const pathname = useSearchParams();
  const headerTitle = pathname.get("board");
  const { darkMode } = useStore();
  return (
    <div
      className={`fixed w-full h-[80px] ${darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white border-kgray-border'} text-kblack-main px-4 border-b z-10`}
    >
      <div className="w-full h-full flex flex-row items-center justify-between">
        <div className="w-full">
          <h1 className={`pl-8 font-bold text-[24px] ${darkMode ? 'text-white' : 'text-kblack-main'}`}>{headerTitle}</h1>
        </div>
      </div>
    </div>
  );
};

export default KanbanHeader;
