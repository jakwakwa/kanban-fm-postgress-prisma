const ColumnText = ({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="uppercase text-sm flex items-center gap-2 tracking-[2px] text-kgray-text">
      <div
        className={`rounded-xl w-[10px] h-[10px] ${
          color === "blue"
            ? "bg-kblue-todo"
            : color === "purple"
            ? "bg-kpurple-main"
            : color === "green"
            ? "bg-kgreen-main"
            : "bg-slate-400"
        }`}
      ></div>
      {children}
    </div>
  );
};

export default ColumnText;
