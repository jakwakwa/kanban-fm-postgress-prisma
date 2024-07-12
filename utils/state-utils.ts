import {
  BoardState,
  ColumnState,
  StateT,
  Subtask,
  TaskPayload,
  TaskState,
} from "@/types/data-types";
import { ChangeEvent, FormEvent, SetStateAction } from "react";

/**
 * Handles the processing of a specific board identified by boardId.
 *
 * @param {BoardState[]} boards - An array of board states.
 * @param {string} boardId - The ID of the board to be processed.
 * @param {(board: BoardState) => void} processBoard - A callback function to process the board.
 */
export const handleBoardProcessing = (
  boards: BoardState[],
  boardId: string,
  processBoard: (board: BoardState) => void
) => {
  const currentBoard = findCurrentBoard(boards, boardId);
  if (currentBoard) {
    processBoard(currentBoard);
  }
};
export const findCurrentBoard = (boards: BoardState[], boardId: string) => {
  return boards.find((board) => board.id === boardId);
};

/**
 * Extracts all tasks from an array of boards.
 *
 * @param boards - An array of BoardState objects, each containing columns with tasks.
 * @returns An array of TaskState objects extracted from all columns of all boards.
 */
export const getAllTasks = (boards: BoardState[]): TaskState[] => {
  /**
   * Extracts tasks from a single column.
   *
   * @param column - A ColumnState object containing tasks.
   * @returns An array of TaskState objects from the column.
   */
  const extractTasksFromColumn = (column: ColumnState) => column.tasks;

  /**
   * Extracts tasks from a single board by iterating over its columns.
   *
   * @param board - A BoardState object containing columns with tasks.
   * @returns An array of TaskState objects from all columns of the board.
   */
  const extractTasksFromBoard = (board: BoardState) =>
    board.columns.flatMap((column) => extractTasksFromColumn(column));

  return boards.flatMap((board) => extractTasksFromBoard(board));
};

/**
 * Updates the title of a subtask at a specific index within an array of subtasks.
 *
 * @param updatedSubTasks - An object containing an array of subtasks.
 * @param i - The index of the subtask to be updated.
 * @param e - The change event containing the new value for the subtask title.
 * @returns The updated array of subtasks with the modified title.
 */
export function addUpdatedSubtaskUtil(
  updatedSubTasks: { subtasks: Subtask[] },
  i: number,
  e: ChangeEvent<HTMLInputElement>
) {
  const updatedSubtask = [...updatedSubTasks.subtasks];
  updatedSubtask[i].title = e.target.value;
  return updatedSubtask;
}

/**
 * Creates a function that, when called, will map through a list of tasks and associate each task with its corresponding subtasks.
 *
 * @param {TaskState[]} tasksStore - An array of tasks, each containing task details.
 * @param {Subtask[]} subTasks - An array of subtasks, each containing subtask details and a parent task ID.
 * @returns {Function} A function that returns an array of tasks, where each task includes a 'subtasks' property containing its associated subtasks.
 */
export function getTasksFromBoard(
  tasksStore: TaskState[],
  subTasks: Subtask[]
) {
  return () => {
    return tasksStore.map((task: TaskState) => ({
      ...task,
      subtasks: subTasks.filter((subTask) => task.id === subTask.taskId),
    }));
  };
}
export function addTaskFn(
  setState: {
    (value: SetStateAction<StateT>): void;
    (arg0: {
      (prevState: any): any;
      (prevState: any): any;
      (prevState: any): any;
    }): void;
  },
  state: StateT,
  addTasks: (tasks: TaskState[]) => void,
  tasksStore: TaskState[],
  router: any,
  boardName: string | null,
  boardId: string
) {
  return async (
    e: FormEvent,
    newtask: TaskPayload,
    colId: string,
    status: string
  ): Promise<void> => {
    e.preventDefault();
    setState((prevState: any) => ({
      ...prevState,
      loading: true,
      open: false,
    }));

    const newT = {
      ...state.newTask,
      status: status,
      columnId: colId,
    };

    try {
      const result = await addTaskEntry(newT);

      setState((prevState: any) => ({
        ...prevState,
        loading: false,
        open: true,
        toastMsg: {
          title: "Success",
          description: "The task has been successfully created.",
        },
        addTaskMode: false,
      }));
      addTasks([...tasksStore, result]);
      router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
      router.refresh();
    } catch (error) {
      console.error("Error adding task:", error);
      setState((prevState: any) => ({ ...prevState, loading: false }));
    }
  };
}
export function deleteBoardFn(
  setIsDeletingBoard: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  router: any,
  state: StateT,
  setState: {
    (value: SetStateAction<StateT>): void;
    (arg0: {
      (prevState: any): any;
      (prevState: any): any;
      (prevState: any): any;
    }): void;
  }
) {
  return async (e: { preventDefault: () => void }, boardId: string) => {
    e.preventDefault();
    setIsDeletingBoard(true);
    try {
      await addDeleteBoardEntry(boardId);
      setState((prevState: any) => ({
        ...prevState,
        open: true,
        toastMsg: {
          title: "Success",
          description: "The board was successfully deleted",
        },
      }));
      router.push(`/kanban`);

      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
}
export function editBoardFn(
  setBoardSaving: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  addBoards: (boards: BoardState[]) => void,
  boards: BoardState[],
  router: any,
  setState: {
    (value: SetStateAction<StateT>): void;
    (arg0: { (prevState: any): any; (prevState: any): any }): void;
  },
  setOpenBoardOptions: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  setOpenEditBoardModul: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  }
) {
  return async (
    e: FormEvent,
    editedBoard: string,
    boardId: string,
    newColumns: {
      name: string;
      id: string;
      tasks: TaskState[] | [];
    }[]
  ): Promise<void> => {
    e.preventDefault();

    setBoardSaving(true);
    console.log("newColumns", newColumns);
    const newtitle = {
      name: editedBoard,
    };

    const editedB = {
      ...newtitle,
      columns: newColumns,
      id: boardId,
    };

    console.log("c t:", newColumns);

    try {
      // @ts-ignore
      const result = await editBoardEntry(editedB);

      addBoards([...boards, result]);
      router.push(`/kanban/board?board=${editedBoard}&id=${boardId}`);

      setState((prevState: any) => ({
        ...prevState,
        loading: false,
        open: true,
        openModul: false,
        toastMsg: {
          title: "Board Edited",
          description: "The board has been successfully edited.",
        },
      }));
      setBoardSaving(false);
      setOpenBoardOptions(false);
      setOpenEditBoardModul(false);
      router.refresh();
    } catch (error) {
      console.error("Error editing board:", error);
      setState((prevState: any) => ({ ...prevState, loading: false }));
    }
  };
}
/**
 * Creates a URL by appending the given path to the window's origin.
 * @param {string} path - The path to append.
 * @returns {string} The full URL.
 */

export const createURL = (path: string) => window.location.origin + path;
/**
 * Adds a new task entry by making a POST request to the API.
 * @param {Partial<TaskState>} updates - The task data to add.
 * @returns {Promise<any>} The response from the API.
 * @throws Will throw an error if the API request fails.
 */

export const addTaskEntry = async (updates: Partial<TaskState>) => {
  const url = createURL("/api/addTask"); // Ensure createURL is defined and used correctly
  const res = await fetch(
    new Request(url, {
      method: "POST",
      body: JSON.stringify(updates),
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
/**
 * Asynchronously edits a board entry by sending a POST request with the updates.
 * @param updates A partial structure of the board state to be updated.
 * @returns The updated board state as a JSON object.
 * @throws An error if the response from the API server is not OK.
 */

export const editBoardEntry = async (updates: Partial<BoardState>) => {
  const url = createURL("/api/boards");
  const res = await fetch(
    new Request(url, {
      method: "POST",
      body: JSON.stringify(updates),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text();
    throw new Error(`Something went wrong on API server: ${errorText}`);
  }
};
/**
 * Deletes a board entry by making a DELETE request to the API.
 * @param {string} id - The ID of the board to delete.
 * @returns {Promise<any>} The response from the API.
 * @throws Will throw an error if the API request fails.
 */

export const addDeleteBoardEntry = async (id: string) => {
  const res = await fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text();
    throw new Error(`Something went wrong on API server: ${errorText}`);
  }
};
