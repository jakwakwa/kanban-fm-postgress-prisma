import { User } from "@prisma/client";

export interface Subtask {
  title: string;
  isCompleted: boolean;
  id: string;
  taskId: string;
}

export interface StateT {
  isDisabled: boolean;
  openModul: boolean;
  taskName: string;
  taskId: string;
  columnName: string;
  columnId: string;
  open: boolean;
  openDeleteToast: boolean;
  loading: boolean;
  addTaskMode: boolean;
  newTask: {
    columnId: string;
    title: string;
    description: string;
    status: string;
  };
  newSubtasks: Subtask[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  subtasks?: Subtask[];
  columnId: string;
}

export interface Column {
  id: string;
  boardId: string;
  name: string;
  tasks: Task[];
}

export interface ColumnData {
  id: string;
  boardId: string;
  tasks: Task[];
  title: string;
}

export interface Board {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  userId: string;
  user: User;
  columns: Column[];
}

export interface BoardsData {
  boardsStore: Board[];
}
