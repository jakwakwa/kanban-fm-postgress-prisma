"use client";
import KanbanCard from "@/components/ui/kanban/kanban-card";
import ColumnText from "@/components/ui/kanban/column-text";
import useStore from "@/context/store";
import { useSearchParams } from "next/navigation";
import { BoardsData } from "@/types/data-types";
import { COLORS } from "@/constants/theme";
import { useState } from "react";
import ViewTask from "./view-task";

const KanbanGrid = ({
  boardsFromDb,
  cols,
  tasks,
  subTasks,
}: {
  boardsFromDb: any[];
  cols: any[];
  tasks: any[];
  subTasks: any[];
}) => {
  const { boards } = useStore() as BoardsData;
  const [openModul, setOpenModul] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [columnName, setColumnName] = useState("");
  const slug = useSearchParams();
  // const boardName = slug.get("board");
  const boardName = "Test Task DB";
  const list = boards?.find((l) => l.name === boardName);

  // console.log("boardsFromDb", list);
  // console.log("boards", boards);

  return (
    <>
      {openModul ? (
        <div className="absolute w-full left-0 m-0 p-0 h-[100%] bg-slate-700 bg-opacity-50">
          <ViewTask
            boardName={boardName}
            taskName={taskName}
            boards={boards}
            setOpenModul={setOpenModul}
            colName={columnName}
            tasks={tasks}
            cols={cols}
            subTasks={subTasks}
          />
        </div>
      ) : null}{" "}
      <div className="w-[full] h-full mt-[100px] px-20 grid grid-cols-3 gap-8 text-white mb-[80px]">
        {/*  */}
        {/* {list?.columns?.map((col, index) => (
          <div key={index}>
            <div className="text-black my-4">
              <ColumnText color={COLORS[index]}>{col.name}</ColumnText>
            </div>
            <KanbanCard
              columnData={col}
              boardName={boardName ? boardName : ""}
              openModul={openModul}
              setOpenModul={setOpenModul}
              setTaskName={setTaskName}
              colName={col.name}
              setColumnName={setColumnName}
            />
          </div>
        ))} */}

        {cols?.map((col, index) => (
          <div key={index}>
            <div className="text-black my-4">
              <ColumnText color={COLORS[index]}>{col.name}</ColumnText>
            </div>
            {tasks?.map((task, i) => (
              <KanbanCard
                key={i}
                columnData={task}
                boardName={boardName ? boardName : ""}
                openModul={openModul}
                setOpenModul={setOpenModul}
                setTaskName={setTaskName}
                colName={task.status}
                setColumnName={setColumnName}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default KanbanGrid;
