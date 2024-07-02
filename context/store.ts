import {
  BoardState,
  ColumnState,
  Subtask,
  TaskState,
} from "@/types/data-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface KanbanStore {
  boards: BoardState[];
  currentBoard: any;
  columns: ColumnState[];
  tasks: TaskState[];
  subTasks: Subtask[];
  boardId: string;
  isBoardAdding: boolean;
  loading: boolean;
  addBoards: (boards: BoardState[]) => void;
  addCurrentBoard: (board: BoardState) => void;
  addColumns: (columns: ColumnState[]) => void;
  addTasks: (tasks: TaskState[]) => void;
  addSubTasks: (subTasks: Subtask[]) => void;
  addBoardId: (boardId: string) => void;
  setIsBoardAdding: (isBoardAdding: boolean) => void;
  setLoader: (loading: boolean) => void;
  reset: () => void;
}

// Function to parse JSON data into Zustand store structure
const useStore = create<KanbanStore>()(
  devtools((set) => ({
    boards: [],
    currentBoard: {},
    boardId: "",
    columns: [],
    tasks: [],
    subTasks: [],
    isBoardAdding: false,
    loading: false,
    addBoards: (boards) => {
      set((state) => ({
        ...state,
        boards: [...boards],
      }));
    },
    addCurrentBoard: (currentBoard) => set({ currentBoard: currentBoard }),
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
    setIsBoardAdding: (isBoardAdding) => {
      set((state) => ({
        ...state,
        isBoardAdding: isBoardAdding,
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
        isBoardAdding: false,
        loading: false,
      });
    },
  }))
);

export default useStore;
