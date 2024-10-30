const ColumnText = ({
  color,
  alignRight,
  darkMode,
  children,
}: {
  color: string;
  alignRight: boolean;
  children: React.ReactNode;
  darkMode: boolean;
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
      <div className={`${darkMode ? 'text-white' : 'text-slate-700'} uppercase text-sm flex items-center gap-2 tracking-[2px]`}>
        <div className={`rounded-xl w-[10px] h-[10px] ${bgColorClass}`}></div>
        {children}
      </div>
    );
  }
  if (alignRight) {
    return (
      <div className={`${darkMode ? 'text-white' : 'text-slate-700'} uppercase text-sm flex items-center gap-2 tracking-[2px]`}>
        <div className={`rounded-xl w-[10px] h-[10px] ${bgColorClass}`}></div>
        {children}
      </div>
    );
  }
};

export default ColumnText;
