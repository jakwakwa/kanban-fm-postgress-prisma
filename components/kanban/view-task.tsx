"use client";

import { useEffect, useState } from "react";
import useStore from "@/context/store";
import { TaskState, Subtask as SubTask, StateT } from "@/types/data-types";
import ViewTaskInputs from "./view-task-inputs";
import EditTask from "./edit-task";
import { SpinnerRoundFilled } from "spinners-react";
import { INITIAL_TASK } from "@/constants/initial-data";

interface ViewTaskProps {
  state: StateT;
  setState: React.Dispatch<React.SetStateAction<StateT>>;
  tasks: TaskState[];
  router: any;
  boardName: string;
  boardId: string;
  columnStatus: any;
}
function ViewTask({
  state,
  setState,
  tasks,
  router,
  boardName,
  boardId,
  columnStatus,
}: Readonly<ViewTaskProps>) {
  const task: TaskState | undefined = tasks.find((t) => t.id === state.taskId);

  const [openOptions, setOpenOptions] = useState(false);

  const [loading, setLoading] = useState(false);

  const addTasks = useStore((state) => state.addTasks);

  const [updatedStatus, setUpdatedStatus] = useState(
    `{"columnId":"${state.columnId}","columnStatus":"${
      task?.status ? task?.status : "Todo"
    }", "boardId":"${boardId}"}`
  );

  const [updatedSubTasks, setUpdatedSubTasks] = useState(
    task ? { subtasks: task.subtasks } : { subtasks: [] }
  );

  const [newSubtask, setNewSubtask] = useState<SubTask>({
    id: "",
    title: "",
    taskId: "",
    isCompleted: false,
  });

  const [newStatus, setNewStatus] = useState<any>(task?.status);

  const [newColId, setNewColId] = useState(task?.columnId);
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle] = useState(task?.title);
  const [updated, setUpdated] = useState(false);
  const [subtaskAdded, setSubtaskAdded] = useState(false);
  const [updatedDescription] = useState(
    task?.description ? task?.description : ""
  );
  const [subtaskLoading, setSubtaskLoading] = useState(true);
  const [updatedTask, setUpdatedTask] = useState({
    title: updatedTitle ?? "",
    description: updatedDescription ?? "",
    status: "",
    columnId: state.columnId ?? "",
  });

  useEffect(() => {
    if (updated) {
      addTasks(tasks);

      router.refresh();
      setState((prevState: StateT) => ({
        ...prevState,
        openModul: false,
      }));

      setTimeout(() => {
        setState((prevState: StateT) => ({
          ...prevState,
          open: true,
        }));
      }, 1000);
    }

    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated, open]);

  const handleUpdateTitle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateEntry(task!.id, {
        ...updatedTask,
      });
      setTimeout(() => {
        setUpdated(true);
      }, 2200);

      setTimeout(() => {
        setLoading(false);
      }, 2700);
      router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleUpdateSubTask = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    if (task) {
      try {
        for (let i = 0; i < task.subtasks.length; i++) {
          await updateSubTaskEntry(task?.subtasks[i].id, {
            ...updatedSubTasks.subtasks[i],
          });
        }

        setTimeout(() => {
          setUpdated(true);
        }, 2200);

        setTimeout(() => {
          setLoading(false);
          setState((prevState: StateT) => ({
            ...prevState,
            openModul: false,
          }));
        }, 2700);
        router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleAddSubTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newSubtaskEnt = {
      title: newSubtask.title,
      isCompleted: newSubtask.isCompleted,
      taskId: newSubtask.taskId,
    };

    try {
      await addSubTaskEntry(newSubtaskEnt);

      await router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
      router.refresh();
      setTimeout(() => {
        setSubtaskAdded(true);
      }, 2200);

      setTimeout(() => {
        setSubtaskLoading(false);
      }, 2700);

      setEditMode(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const deleteTask = async (
    e: { preventDefault: () => void },
    taskId: string
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDeleteTaskEntry(taskId);
      await router.push(`/kanban/board?board=${boardName}&id=${boardId}`);

      setTimeout(() => {
        setUpdated(true);
      }, 2200);

      setTimeout(() => {
        setLoading(false);
      }, 2700);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      setOpenOptions(false);
    }
  }, [editMode]);

  function handleOptions() {
    setOpenOptions(!openOptions);
  }

  useEffect(() => {
    setUpdatedTask({
      ...updatedTask,
      status: newStatus,
      columnId: newColId ?? "",
    });
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newColId, newStatus]);

  if (!editMode) {
    return (
      <>
        {loading && (
          <div className="absolute bg-[#475ca77c] w-screen h-screen top-0 left-0 z-10 spinner text-black">
            <div className="absolute mx-auto top-[20%] left-0 z-10 spinner w-screen text-black">
              <div className="bg-white px-12 py-14 w-[400px] mx-auto flex flex-col justify-center rounded-3xl shadow-2xl">
                <div className="h-[25px] w-full p-0 m-0 text-sm leading-1 text-indigo-500 text-center animate-pulse ">
                  Please wait while deleting the task...
                </div>
                <div className="h-[50px] w-[20%] mx-auto ">
                  <SpinnerRoundFilled
                    size={50}
                    thickness={100}
                    speed={100}
                    color="rgba(74, 57, 172, 0.71)"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <ViewTaskInputs
          handleOptions={handleOptions}
          openOptions={openOptions}
          setEditMode={setEditMode}
          taskName={state.taskName}
          task={task}
          deleteTask={deleteTask}
        />
      </>
    );
  }

  if (editMode) {
    return (
      <EditTask
        updatedTask={updatedTask}
        setUpdatedTask={setUpdatedTask}
        task={task ?? INITIAL_TASK}
        setUpdatedSubTasks={setUpdatedSubTasks}
        updatedStatus={updatedStatus}
        setUpdatedStatus={setUpdatedStatus}
        columnStatus={columnStatus}
        setNewStatus={setNewStatus}
        setNewColId={setNewColId}
        newStatus={newStatus}
        handleUpdateTitle={handleUpdateTitle}
        handleUpdateSubTask={handleUpdateSubTask}
        handleAddSubTask={handleAddSubTask}
        loading={loading}
        updatedSubTasks={updatedSubTasks}
        subTaskLoading={subtaskLoading}
        setSubtaskLoading={setSubtaskLoading}
        subtaskAdded={subtaskAdded}
        setSubtaskAdded={setSubtaskAdded}
        setNewSubtask={setNewSubtask}
      />
    );
  }
}

export default ViewTask;

export const createURL = (path: string) => window.location.origin + path;

export const updateEntry = async (id: string, updates: Partial<TaskState>) => {
  const res = await fetch(
    new Request(createURL(`/api/task/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ updates }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

export const updateSubTaskEntry = async (
  id: string,
  updates: Partial<SubTask>
) => {
  const res = await fetch(
    new Request(createURL(`/api/subtask/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ updates }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

export const addSubTaskEntry = async (updates: Partial<SubTask>) => {
  const url = createURL("/api/subtask"); // Ensure createURL is defined and used correctly

  const res = await fetch(
    new Request(url, {
      method: "POST",
      body: JSON.stringify(updates), // Directly stringify the updates object
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text(); // Get error text for better debugging
    throw new Error(`Something went wrong on API server: ${errorText}`);
  }
};

export const addDeleteTaskEntry = async (id: string) => {
  const res = await fetch(`/api/task/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return res.json();
  } else {
    console.error("Failed to delete task", res.status, res.statusText);
  }
};
