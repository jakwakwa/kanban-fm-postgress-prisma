import { TaskState } from "@/types/data-types";
import CheckboxDemo from "../ui/form-elements/checkbox";

function Subtask({ task, edit }: { task: TaskState[]; edit: boolean }) {
  if (task.length > 0 && edit === false) {
    return task?.map((subtask) => (
      <CheckboxDemo key={subtask.id} title={subtask.title} />
    ));
  }
}

export default Subtask;
