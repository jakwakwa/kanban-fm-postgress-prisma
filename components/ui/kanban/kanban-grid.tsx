"use client";
import KanbanCard from "@/components/ui/kanban/kanban-card";
import ColumnText from "@/components/ui/kanban/column-text";
import useStore from "@/context/store";

const KanbanGrid = () => {
  const tempArray = ["1", "2"];
  const tempAmount = "2";
  // @ts-ignore
  const { boards } = useStore(); // Access the store's state
  console.log(boards);
  return (
    <div className="w-[2600px] h-full mt-[100px] px-20 grid grid-cols-7 gap-8 text-white">
      <div className="grid gap-4  h-[100px]">
        <ColumnText color="blue">Todo ({tempAmount})</ColumnText>

        {/*
        // TODO: Boards need to be added to sidenav instead
        // @ts-ignore*/}
        <div className="text-black">{boards?.map((board) => board.name)}</div>
        <div className="text-black">Number of bears:</div>
        {tempArray.map((i) => (
          <KanbanCard key={i} />
        ))}
      </div>
      <div className="grid gap-4  h-[100px]">
        <ColumnText color="purple">Doing ({tempAmount})</ColumnText>
        {tempArray.map((i) => (
          <KanbanCard key={i} />
        ))}
      </div>
      <div className="grid gap-4  h-[100px]">
        <ColumnText color="green">Done ({tempAmount})</ColumnText>
        {tempArray.map((i) => (
          <KanbanCard key={i} />
        ))}
      </div>
      <div className="grid gap-4  h-[100px]">
        <ColumnText color="gray">Other ({tempAmount})</ColumnText>
        {tempArray.map((i) => (
          <KanbanCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default KanbanGrid;
