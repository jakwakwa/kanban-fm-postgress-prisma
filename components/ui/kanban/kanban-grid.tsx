"use client";
import KanbanCard from "@/components/ui/kanban/kanban-card";
import ColumnText from "@/components/ui/kanban/column-text";
import useStore from "@/context/store";
import { useSearchParams, useRouter } from "next/navigation";
import { BoardsData } from "@/types/data-types";
import { COLORS } from "@/constants/theme";
import { useEffect, useState } from "react";
import ViewTask from "./view-task";
import Subtask from "./subtask";
import { SpinnerRoundFilled } from "spinners-react";

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
  // const { boardsStore } = useStore() as BoardsData;
  // @ts-ignore
  const addColumns = useStore((state) => state.addColumns);
  // @ts-ignore
  const addTasks = useStore((state) => state.addTasks);
  // @ts-ignore
  const addSubTasks = useStore((state) => state.addSubTasks);
  const [openModul, setOpenModul] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskId, setTaskId] = useState("");
  const [columnName, setColumnName] = useState("");
  const [columnId, setColumnId] = useState("");
  const slug = useSearchParams();
  const boardName = slug.get("board");
  const bId = slug.get("id");
  // @ts-ignore
  const loader = useStore((state) => state.loading);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    addColumns(cols);
    addSubTasks(subTasks);
    addTasks(tasks);
  }, [addColumns, addSubTasks, addTasks, cols, subTasks, tasks]);

  let tasksByBoard: any[] = [];
  function getTasks() {
    tasks?.map((task, i) => {
      const ste = subTasks?.filter((subTask, i) => task.id === subTask.taskId);
      tasksByBoard = [
        ...tasksByBoard,
        {
          ...task,
          subtasks: [...ste],
        },
      ];
    });
  }

  let columnDetes: any[] = [];
  function getCols() {
    cols?.map((col) => {
      columnDetes = [
        ...columnDetes,
        {
          columnId: col.id,
          columnStatus: col.name,
          boardId: col.boardId,
        },
      ];
      return columnDetes;
    });
  }

  getCols();
  const filteredColsbyBoard = columnDetes.filter((c) => c.boardId === bId);
  console.log(filteredColsbyBoard);
  getTasks();

  if (loader) {
    return (
      <div
        className="absolute w-full left-0 m-0 p-0 h-[100%]"
        style={{
          background: "rgba(72, 54, 113, 0.2)",
        }}
      >
        <div className="absolute top-[40%] left-1/2 w-full h-full mx-auto rounded-md p-[32px] pb-[48px]">
          <SpinnerRoundFilled
            size={50}
            thickness={100}
            speed={100}
            color="rgba(74, 57, 172, 0.71)"
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        {openModul ? (
          <>
            <div
              className="absolute w-full left-0 m-0 p-0 h-[100%] bg-slate-700 bg-opacity-50"
              onClick={() => setOpenModul(false)}
            ></div>
            <ViewTask
              taskName={taskName}
              tasks={tasksByBoard}
              router={router}
              boardName={boardName}
              boardId={bId}
              setOpenModul={setOpenModul}
              columnStatus={filteredColsbyBoard}
              columnId={columnId}
            />
          </>
        ) : null}

        <div className="w-[full] h-full px-20 grid grid-cols-3 gap-8 text-white pt-[100px]">
          {cols?.map((col, index) => {
            if (col.boardId === bId) {
              return (
                <div key={index}>
                  <div className="text-black my-4">
                    <ColumnText color={COLORS[index]}>{col.name}</ColumnText>
                  </div>
                  {tasksByBoard?.map((task, i) => {
                    if (task.status === col.name && col.id === task.columnId) {
                      return (
                        <div key={i}>
                          <KanbanCard
                            task={task}
                            setOpenModul={setOpenModul}
                            setTaskName={setTaskName}
                            setTaskId={setTaskId}
                            colName={task?.status}
                            subTaskAmount={
                              task?.subtasks ? task?.subtasks.length : 0
                            }
                            setColumnName={setColumnName}
                            setColumnId={setColumnId}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              );
            }
          })}
        </div>
      </>
    );
  }
};

export default KanbanGrid;
