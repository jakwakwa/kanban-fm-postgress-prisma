"use client";

import {
  ChangeEvent,
  Dispatch,
  Key,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useStore from "@/context/store";
import { Task, Subtask as SubTask } from "@/types/data-types";
import ViewTaskInputs from "./view-task-inputs";
import EditTask from "./edit-task";
import { SpinnerRoundFilled } from "spinners-react";

interface ViewTaskProps {
  taskName: string;
  tasks: Task[];
  router: any;
  boardName: string;
  boardId: string;
  setOpenModul: (open: boolean) => void;
  columnStatus: any;
  columnId: string;
  setOpen: any;
  open: any;
  openDeletToast: any;
  setOpenDeleteToast: any;
}

function ViewTask({
  taskName,
  tasks,
  router,
  boardName,
  boardId,
  setOpenModul,
  columnStatus,
  columnId,
  setOpen,
  open,
  openDeletToast,
  setOpenDeleteToast,
}: ViewTaskProps) {
  const task: Task | undefined = tasks.find((t) => t.title === taskName);
  const [openOptions, setOpenOptions] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(taskName);
  const [loading, setLoading] = useState(false);

  const [newTask, setNewTask] = useState({
    id: "",
    columnId: "",
    title: "",
    description: "",
    status: "",
    subtasks: [
      {
        id: "",
        taskId: "",
        title: "",
        isCompleted: false,
      },
    ],
  });

  const addTasks = useStore((state) => state.addTasks);

  const [updatedStatus, setUpdatedStatus] = useState(
    `{"columnId":"${columnId}","columnStatus":"${
      task?.status ? task?.status : "Todo"
    }", "boardId":"${boardId}"}`
  );
  const [updatedDescription, setUpdatedDescription] = useState(
    task?.description ? task?.description : "no description"
  );

  const [updatedSubTasks, setUpdatedSubTasks] = useState(
    task ? { subtasks: task.subtasks } : { subtasks: [] }
  );

  const [newSubtasks, setNewSubtasks] = useState(
    task ? { subtasks: task.subtasks } : { subtasks: [] }
  );

  const [newSubtask, setNewSubTask] = useState<SubTask>({
    id: "",
    title: "",
    taskId: "",
    isCompleted: false,
  });

  const [newStatus, setNewStatus] = useState<any>(
    '{"columnId":"","columnStatus":""}'
  );

  const [newColId, setNewColId] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [addTaskMode, setAddTaskMode] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [updatedTask, setUpdatedTask] = useState({
    title: updatedTitle,
    description: updatedDescription,
    status: newStatus.columnStatus,
    columnId: newStatus.columnId,
  });

  useEffect(() => {
    if (updated) {
      addTasks(tasks);

      router.refresh();
      setOpenModul(false);

      // setTimeout(() => {
      //   setOpen(true);
      // }, 1000);
    }

    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpenModul, updated, open]);

  const handleUpdateTitle = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateEntry(
        task!.id,
        {
          ...updatedTask,
        },
        setOpen
      );
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

  const handleUpdateSubTask = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();

    setLoading(true);
    if (task) {
      try {
        for (let i = 0; i < task?.subtasks.length; i++) {
          await updateSubTaskEntry(
            task?.subtasks[i]!.id,
            {
              ...updatedSubTasks.subtasks[i],
            },
            setOpen
          );
        }

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
    }
  };

  const handleAddSubTask = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const newSubtaskEnt = {
      title: newSubtask.title,
      isCompleted: newSubtask.isCompleted,
      taskId: newSubtask.taskId,
    };

    try {
      await addSubTaskEntry(newSubtaskEnt, setOpen);

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

  const deleteTask = async (
    e: { preventDefault: () => void },
    taskId: string
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDeleteTaskEntry(taskId, setOpenDeleteToast);
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
      columnId: newColId,
    });
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newColId, newStatus]);

  if (!editMode && !addTaskMode) {
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
          taskName={taskName}
          task={task}
          updatedStatus={updatedStatus}
          setUpdatedStatus={setUpdatedStatus}
          columnStatus={columnStatus}
          setNewStatus={setNewStatus}
          newStatus={newStatus}
          setNewColId={setNewColId}
          setUpdatedTask={setUpdatedTask}
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
        task={task}
        setUpdatedSubTasks={setUpdatedSubTasks}
        updatedStatus={updatedStatus}
        setUpdatedStatus={setUpdatedStatus}
        columnStatus={columnStatus}
        setNewStatus={setNewStatus}
        setNewColId={setNewColId}
        newStatus={newStatus}
        newColId={newColId}
        handleUpdateTitle={handleUpdateTitle}
        handleUpdateSubTask={handleUpdateSubTask}
        handleAddSubTask={handleAddSubTask}
        loading={loading}
        updatedSubTasks={updatedSubTasks}
        setNewSubTask={setNewSubTask}
        newSubTask={newSubtask}
        setEditMode={setEditMode}
      />
    );
  }
}

export default ViewTask;

export const createURL = (path: string) => window.location.origin + path;

export const updateEntry = async (
  id: string,
  updates: Partial<Task>,
  setToastSuccess: (arg0: boolean) => void
) => {
  setToastSuccess(false);
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
    setTimeout(() => {
      setToastSuccess(true);
    }, 3500);

    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

export const updateSubTaskEntry = async (
  id: string,
  updates: Partial<SubTask>,
  setToastSuccess: (arg0: boolean) => void
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
    setTimeout(() => {
      setToastSuccess(true);
    }, 3500);
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

export const addSubTaskEntry = async (
  updates: Partial<SubTask>,
  setToastSuccess: (arg0: boolean) => void
) => {
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
    setTimeout(() => {
      setToastSuccess(true);
    }, 3500);
    return res.json();
  } else {
    const errorText = await res.text(); // Get error text for better debugging
    throw new Error(`Something went wrong on API server: ${errorText}`);
  }
};

export const addDeleteTaskEntry = async (
  id: string,
  setToastSuccess: (arg0: boolean) => void
) => {
  const res = await fetch(`/api/task/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    setTimeout(() => {
      setToastSuccess(true);
    }, 3500);
    return res.json();
  } else {
    console.error("Failed to delete task", res.status, res.statusText);
  }
};
