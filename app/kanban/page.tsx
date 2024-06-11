import useStore from "@/context/store";
import { useRouter } from "next/navigation";
import { BoardsData } from "@/types/data-types";

const KanbanPage = async () => {
  const isEmpty = true;

  // const { boards } = useStore() as BoardsData;
  // const router = useRouter();

  // if (boards.length > 0)
  //   router.push(`/kanban/board?board=${boards[0].name}`, { scroll: false });

  return (
    <>
      {isEmpty && (
        <div className="h-full flex flex-col items-center justify-center align-middle">
          <div className="mb-4">Pick a board to get started.</div>
        </div>
      )}
    </>
  );
};

export default KanbanPage;
