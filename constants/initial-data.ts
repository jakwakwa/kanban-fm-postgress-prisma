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
  columns: [],
  columnName: "",
  columnId: "",
  columnOrder: [],
  open: false,
  openDeleteToast: false,
  loading: false,
  addTaskMode: false,
  toastMsg: {
    title: "Success",
    description: "The item has been successfully updated.",
  },
  newTask: {
    columnId: "",
    title: "",
    description: "",
    status: "",
  },
  newSubtasks: [] as Subtask[]
};
