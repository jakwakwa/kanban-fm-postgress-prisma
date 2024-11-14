import { SpinnerCircular } from "spinners-react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { commonClasses } from "@/components/kanban/kanban-grid-styles";

interface AcceptButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  darkMode: boolean;
}

const AcceptButton = ({ darkMode, onClick, disabled, isLoading }: AcceptButtonProps) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`bg-kpurple-main w-10 h-9 hover:opacity-40 disabled:bg-slate-400 text-white ${darkMode ? 'text-white' : 'text-black'} ${commonClasses.iconButton}`}
    >
      {isLoading ? (
        <SpinnerCircular color="#fff" size={20} thickness={200} />
      ) : (
        <CheckIcon />
      )}
    </button>
  );
};

export default AcceptButton; 