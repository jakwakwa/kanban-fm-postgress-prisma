"use client";
import KanbanCard from "@/components/ui/kanban/kanban-card";
import ColumnText from "@/components/ui/kanban/column-text";
import useStore from "@/context/store";
import { useSearchParams } from "next/navigation";
import { BoardsData } from "@/types/data-types";
import { COLORS } from "@/constants/theme";

const KanbanGrid = () => {
  const { boards } = useStore() as BoardsData;
  const slug = useSearchParams();
  const boardName = slug.get("query");
  const list = boards?.find((l) => l.name === boardName);

  return (
    <div className="w-[full] h-full mt-[100px] px-20 grid grid-cols-3 gap-8 text-white mb-[80px]">
      {/*  */}
      {list?.columns?.map((col, index) => (
        <div key={index}>
          <div className="text-black my-4">
            <ColumnText color={COLORS[index]}>{col.name}</ColumnText>
          </div>
          <KanbanCard columnData={col} />
        </div>
      ))}
    </div>
  );
};

export default KanbanGrid;
