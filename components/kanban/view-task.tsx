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
import AddTask from "./add-task";

interface ViewTaskProps {
  taskName: string;
  tasks: Task[];
  router: any;
  boardName: string;
  boardId: string;
  setOpenModul: (open: boolean) => void;
  columnStatus: any;
  columnId: string;
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

  const [updatedStatus, setUpdatedStatus] = useState(
    `{"columnId":"${columnId}","columnStatus":"${
      task?.status ? task?.status : "no status"
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

  const [subTask, setSubTask] = useState<SubTask[]>([]);

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
      setTimeout(() => {
        setOpenModul(false);
        setLoading(false);
      }, 4000);
    }
  }, [setOpenModul, updated]);

  useEffect(() => {
    setSubTask(updatedSubTasks.subtasks);
  }, [updatedSubTasks]);

  const handleUpdateTitle = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateEntry(task!.id, {
        ...updatedTask,
      });
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
    try {
      // @ts-ignore
      await updateSubTaskEntry(task?.subtasks[0]!.id, {
        ...updatedSubTasks.subtasks[0],
      });
      setUpdated(true);
      router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
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
        loading={loading}
      />
    );
  }
}

export default ViewTask;

export const createURL = (path: string) => window.location.origin + path;

export const updateEntry = async (id: string, updates: Partial<Task>) => {
  const res = await fetch(
    new Request(createURL(`/api/task/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ updates }),
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
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};
