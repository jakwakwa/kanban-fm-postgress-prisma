import React from "react";
import KanbanCard from "./kanban-card";
import ColumnText from "./column-text";

const KanbanGrid = () => {
  const tempArray = ["1", "2"];
  const tempAmount = "2";
  return (
    <div className="w-[2600px] h-full mt-[100px] px-20 grid grid-cols-7 gap-8 text-white">
      <div className="grid gap-4  h-[100px]">
        <ColumnText color="blue">Todo ({tempAmount})</ColumnText>
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
