import Button from "../ui/button";
import KanbanGrid from "./kanban-grid";

const KanbanPage = () => {
  const isEmpty = false;
  return (
    <>
      {isEmpty && (
        <div className="h-full flex flex-col items-center justify-center align-middle">
          <div className="mb-4">
            This board is empty. Create a new column to get started.
          </div>

          <Button href={"#"} isDisabled={false}>
            + Add New Column
          </Button>
        </div>
      )}

      {!isEmpty && <KanbanGrid />}
    </>
  );
};

export default KanbanPage;
