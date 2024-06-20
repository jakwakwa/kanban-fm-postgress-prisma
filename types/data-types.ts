export interface Subtask {
  title: string;
  isCompleted: boolean;
  id: string;
  taskId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
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
  name: string;
  columns: Column[];
}

export interface BoardsData {
  boardsStore: Board[];
}
