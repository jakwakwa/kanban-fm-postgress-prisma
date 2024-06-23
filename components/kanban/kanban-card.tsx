import { TaskState } from "@/types/data-types";

interface KanbanCardProps {
  task: TaskState;
  setState: React.Dispatch<React.SetStateAction<any>>;
  totalSubtasks: string;
}

const KanbanCard = ({ task, setState, totalSubtasks }: KanbanCardProps) => {
  function handleViewTask(name: string, id: string) {
    setState((prevState: any) => ({
      ...prevState,
      openModul: true,
      taskName: name,
      taskId: id,
    }));
  }

  return (
    <div className="flex flex-col gap-4 h-[auto] min-h-[140px] mb-4">
      <button
        onClick={() => handleViewTask(task.title, task.columnId)}
        className="bg-white hover:bg-slate-50 h-[auto] min-h-[140px] rounded-md shadow-md p-[16px] flex flex-col justify-between cursor-pointer capitalize"
      >
        <div>
          <h2 className="text-2md text-kblack-main text-left">{task?.title}</h2>
          <h3 className="text-slate-500 font-normal italic text-xs text-ellipsis h-8 overflow-clip  line-clamp-1 pr-2 mt-2 text-left">
            {task.description}
          </h3>
        </div>
        <h4 className="text-slate-600 mt-[4px] text-right">
          {totalSubtasks} subtasks
        </h4>
      </button>
    </div>
  );
};

export default KanbanCard;
