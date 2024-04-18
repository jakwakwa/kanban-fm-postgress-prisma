import Button from "../ui/button";
import KanbanHeader from "../ui/kanban/header";

const KanbanPage = () => {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center align-middle">
        <div className="mb-4">
          This board is empty. Create a new column to get started.
        </div>
        <Button href={"#"} isDisabled={false}>
          + Add New Column
        </Button>
      </div>
    </>
  );
};

export default KanbanPage;
