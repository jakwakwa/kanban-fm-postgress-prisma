import Image from "next/image";

interface BoardOptionsButtonProps {
  onClick: () => void;
}

const BoardOptionsButton = ({ onClick }: BoardOptionsButtonProps): JSX.Element => {
  return (
    <div className="absolute right-[10px] flex flex-col items-end text-xs text-right top-6 z-20">
      <button
        onClick={onClick}
        className="flex justify-center align-middle items-center w-6 h-6 hover:border hover:border-slate-300 rounded-lg"
      >
        <Image
          src="/assets/icon-vertical-ellipsis.svg"
          width={4}
          height={4}
          alt="Options Menu"
        />
      </button>
    </div>
  );
};

export default BoardOptionsButton; 