import { Key } from "react";
import CheckboxDemo from "../checkbox";

function Subtask({ task }: { task: any[] }) {
  if (task.length > 0) {
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
