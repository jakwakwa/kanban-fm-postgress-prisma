import {
  BoardState,
  ColumnState,
  Subtask,
  TaskState,
} from "@/types/data-types";
import { ChangeEvent } from "react";

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
