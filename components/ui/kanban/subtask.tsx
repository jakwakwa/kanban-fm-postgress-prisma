import { Key } from "react";
import CheckboxDemo from "../checkbox";

function Subtask({ task }: { task: any[] }) {
  // @ts-ignore
  return task?.subtasks.map(
    (
      subtask: {
        title: string;
      },
      index: Key
    ) => <CheckboxDemo key={index} title={subtask.title} />
  );
}

export default Subtask;
