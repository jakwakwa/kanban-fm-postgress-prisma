interface AddTaskButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}

const AddTaskButton = ({ isDisabled, onClick }: AddTaskButtonProps): JSX.Element => {
  return (
    <div className="fixed right-12 top-4 w-[200px] flex justify-end z-20">
      <button
        className={`${
          isDisabled
            ? "bg-kpurple-light cursor-not-allowed"
            : "bg-kpurple-main hover:bg-slate-500"
        } px-5 py-3 rounded-3xl text-md text-white text-sm font-semibold`}
        onClick={onClick}
        disabled={isDisabled}
      >
        + Add New Task
      </button>
    </div>
  );
};

export default AddTaskButton; 