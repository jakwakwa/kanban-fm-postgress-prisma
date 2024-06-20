import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Subtask {
  title: string;
  isCompleted: boolean;
  taskId: string;
  id: string;
}

interface Task {
  id: any;
  title: string;
  description: string;
  status: string;
  columnId: string;
}

interface Column {
  id: string;
  name: string;
  boardId: string;
}

interface Board {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  name: string;
}

interface Store {
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  subTasks: Subtask[];
  boardId: string;
  loading: boolean;
  addBoard: (boards: Board[]) => void;
  addColumns: (columns: Column[]) => void;
  addTasks: (tasks: Task[]) => void;
  addSubTasks: (subTasks: Subtask[]) => void;
  addBoardId: (boardId: string) => void;
  setLoader: (loading: boolean) => void;
  reset: () => void;
}

// Function to parse JSON data into Zustand store structure
const useStore = create<Store>(
  // @ts-ignore
  devtools((set) => ({
    boards: [],
    boardId: "",
    columns: [],
    tasks: [],
    subTasks: [],
    loading: false,
    addBoard: (boards) => {
      set((state) => ({
        ...state,
        boards: [...boards],
      }));
    },
    addColumns: (columns) => {
      set((state) => ({
        ...state,
        columns: [...columns],
      }));
    },
    addTasks: (tasks) => {
      set((state) => ({
        ...state,
        tasks: [...tasks],
      }));
    },
    addSubTasks: (subTasks) => {
      set((state) => ({
        ...state,
        subTasks: [...subTasks],
      }));
    },
    addBoardId: (boardId) => {
      set((state) => ({
        ...state,
        boardId: boardId,
        loading: true,
      }));
    },
    setLoader: (loading) => {
      set((state) => ({
        ...state,
        loading: loading,
      }));
    },
    reset: () => {
      set({
        boards: [],
        boardId: "",
        columns: [],
        tasks: [],
        subTasks: [],
        loading: false,
      });
    },
  }))
);

export default useStore;
