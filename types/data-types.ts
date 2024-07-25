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
  columns: ColumnState[];
  columnName: string;
  columnId: string;
  columnOrder: any[];
  open: boolean;
  openDeleteToast: boolean;
  loading: boolean;
  addTaskMode: boolean;
  toastMsg: { title: string; description: string };
  newTask: {
    columnId: string;
    title: string;
    description: string;
    status: string;
  };
  newSubtasks: Subtask[];
}

export interface TaskState {
  id: string;
  title: string;
  description?: string;
  status: string;
  subtasks: Subtask[] | [];
  columnId: string;
}

export interface TaskPayload {
  title: string;
  description?: string;
  status?: string;
  columnId?: string;
}

export interface ColumnState {
  id: string;
  boardId: string;
  name: string;
  tasks: TaskState[];
}

export interface ColumnPayload {
  id: string;
  boardId: string;
  name: string;
}

export interface BoardModel {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  userId: string;
  user: User;
}

export interface BoardData {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
  userId: string;
}

export interface BoardState extends BoardData {
  columns: ColumnState[];
}

export interface BoardsStore {
  boardsStore: BoardState[];
}
