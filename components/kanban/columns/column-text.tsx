const ColumnText = ({
  color,
  alignRight,
  children,
}: {
  color: string;
  alignRight: boolean;
  children: React.ReactNode;
}) => {
  let bgColorClass;

  switch (color.toLowerCase()) {
    case "todo":
      bgColorClass = "bg-kblue-todo";
      break;
    case "doing":
      bgColorClass = "bg-kpurple-main";
      break;
    case "done":
      bgColorClass = "bg-kgreen-main";
      break;
    default:
      bgColorClass = "bg-kgreen-main";
      break;
  }
  if (!alignRight) {
    return (
      <div className="uppercase text-sm flex items-center gap-2 tracking-[2px] text-slate-700 dark:text-white">
        <div className={`rounded-xl w-[10px] h-[10px] ${bgColorClass}`}></div>
        {children}
      </div>
    );
  }
  if (alignRight) {
    return (
      <div className="absolute w-full text-right uppercase text-xs flex items-center gap-2 justify-end tracking-[2px] text-slate-700">
        <div className={`rounded-xl w-[10px] h-[10px] ${bgColorClass}`}></div>
        {children}
      </div>
    );
  }
};

export default ColumnText;
