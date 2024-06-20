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
          color === "todo" || color === "Todo"
            ? "bg-kblue-todo"
            : color === "doing" || color === "Doing"
            ? "bg-kpurple-main"
            : color === "done" || color === "Done"
            ? "bg-kgreen-main"
            : "bg-kgreen-main"
        }`}
      ></div>
      {children}
    </div>
  );
};

export default ColumnText;
