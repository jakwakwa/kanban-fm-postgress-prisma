"use client";

import { BoardsData } from "@/types/data-types";
import useStore from "@/context/store";
import { useSearchParams, usePathname } from "next/navigation";
import path from "path";
import KanbanCard from "@/components/ui/kanban/kanban-card";
import CheckboxDemo from "@/components/ui/checkbox";

function Page() {
  const { boards } = useStore() as BoardsData;
  const slug = useSearchParams();

  const pathName = slug.get("board");
  const taskName = slug.get("title");
  const columnName = slug.get("column");

  const list = boards?.find((l) => l.name === pathName);
  const column = list?.columns.find((n) => n.name === columnName);
  const task = column?.tasks.find((t) => t.title === taskName);
  console.log(task);
  return (
    <div className=" text-black mt-[100px] ml-[90px] w-[70vw]">
      <div className="shadow p-8 bg-white rounded-md">
        <div className="text-lg font-bold"> {task?.title}</div>
        <div className="text-black">Descsssription: {task?.description}</div>
      </div>

      <div className="flex flex-col gap-6 h-[100px] w-[300px]  ml-2">
        <div className="text-md font-bold pt-8"> Subtasks</div>
        {task?.subtasks.map((subtask, index) => (
          <div key={index}>
            <div className="bg-white h-[auto] rounded-md shadow-md p-[16px]">
              <h2 className="text-kblack-main">{subtask?.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
