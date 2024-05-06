import Button from "./button";

const KanbanHeader = () => {
  return (
    <div
      className={`fixed w-full h-[80px] bg-white text-kblack-main px-4 border-b`}
    >
      <div className="w-full h-full flex flex-row items-center justify-between">
        <div className="w-full">
          <h1 className="pl-[330px] font-bold text-[24px]">Platform Launch</h1>
        </div>
        <div className="w-[200px] flex justify-end">
          <Button href={"#"} variant="secondary">
            + Add New Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KanbanHeader;
