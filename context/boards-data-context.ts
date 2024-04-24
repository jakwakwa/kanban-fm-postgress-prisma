// context/BoardsDataContext.ts
import { createContext } from "react";

// Define the type for your context data
interface BoardsData {
  boards: {
    name: string;
    columns: {
      name: string;
      tasks: {
        title: string;
        description: string;
        status: string;
        subtasks: {
          title: string;
          isCompleted: boolean;
        }[];
      }[];
    }[];
  }[];
}

// Create context with the correct type and provide a default value
const BoardsDataContext = createContext<BoardsData | undefined>(undefined);

export { BoardsDataContext };
