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

      setTimeout(() => {
        setOpen(true);
      }, 1000);
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
        setLoading
      );
      setUpdated(true);
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
            setLoading
          );
        }

        setUpdated(true);
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
      await addSubTaskEntry(newSubtaskEnt, setLoading);

      await router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
      setUpdated(true);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Redirect or update the UI after successful deletion
        setOpenModul(false);
        router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("An error occurred while deleting the task:", error);
    } finally {
      setLoading(false);
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
    }, 1500);

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
    }, 1500);
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

export const addSubTaskEntry = async (
  updates: Partial<SubTask>,
  setToastSuccess: (arg0: boolean) => void
) => {
  console.log(updates);

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
    }, 1500);
    return res.json();
  } else {
    const errorText = await res.text(); // Get error text for better debugging
    throw new Error(`Something went wrong on API server: ${errorText}`);
  }
};
