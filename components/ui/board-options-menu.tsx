interface BoardOptionsMenuProps {
  onEdit: () => void;
  onDelete: (e: React.MouseEvent) => void;
  isDeletingBoard: boolean;
}

const BoardOptionsMenu = ({ onEdit, onDelete, isDeletingBoard }: BoardOptionsMenuProps): JSX.Element => {
  return (
    <div className="bg-[#2B2C37] border-[#3E3F4E] rounded-lg shadow-lg absolute right-[32px] mt-[25px] p-4 border w-48 h-auto z-20">
      <div className="flex gap-3 flex-col text-left justify-start align-top items-start">
        <button
          className="text-slate-300 hover:text-slate-100 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug"
          onClick={onEdit}
        >
          Edit Board
        </button>

        <button
          className="text-red-400 hover:text-red-300 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug"
          onClick={onDelete}
          disabled={isDeletingBoard}
        >
          {isDeletingBoard ? "Deleting Board..." : "Delete Board"}
        </button>
      </div>
    </div>
  );
};

export default BoardOptionsMenu; 