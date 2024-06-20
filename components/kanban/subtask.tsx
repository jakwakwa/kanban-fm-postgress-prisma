import { Key } from "react";
import CheckboxDemo from "../ui/form-elements/checkbox";
import * as Form from "@radix-ui/react-form";

function Subtask({
  task,
  setUpdatedSubtasks,
  edit,
}: {
  task: any[];
  setUpdatedSubtasks?: any;
  edit: boolean;
}) {
  if (task.length > 0 && edit === false) {
    return task?.map(
      (
        subtask: {
          title: string;
        },
        index: Key
      ) => <CheckboxDemo key={index} title={subtask.title} />
    );
  }
}

export default Subtask;