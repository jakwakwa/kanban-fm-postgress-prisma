import { StateT, Subtask, TaskState } from "@/types/data-types";
const INITIAL_TASK: TaskState = {
  id: "",
  columnId: "",
  title: "",
  description: "",
  status: "",
  subtasks: [],
};
export { INITIAL_TASK };

export const INITIAL_STATE: StateT = {
  isDisabled: false,
  openModul: false,
  taskName: "",
  taskId: "",
  columnName: "",
  columnId: "",
  open: false,
  openDeleteToast: true,
  loading: false,
  addTaskMode: false,
  newTask: {
    columnId: "",
    title: "",
    description: "",
    status: "",
  },
  newSubtasks: [] as Subtask[],
};
