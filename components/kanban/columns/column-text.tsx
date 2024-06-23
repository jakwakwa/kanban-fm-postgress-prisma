const ColumnText = ({
  color,
  children,
}: {
  color: string;
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

  return (
    <div className="uppercase text-sm flex items-center gap-2 tracking-[2px] text-slate-700">
      <div className={`rounded-xl w-[10px] h-[10px] ${bgColorClass}`}></div>
      {children}
    </div>
  );
};

export default ColumnText;
