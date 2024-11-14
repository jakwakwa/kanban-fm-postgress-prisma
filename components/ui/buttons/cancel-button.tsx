import { commonClasses } from "@/components/kanban/kanban-grid-styles";
import {  XMarkIcon } from "@heroicons/react/24/outline";



const CancelButton = ({darkMode, onCancel}: {darkMode: boolean, onCancel: () => void}) => {
    return (
      <button onClick={onCancel} className={`${commonClasses.iconButton} disabled:cursor-not-allowed disabled:opacity-50 ${darkMode ? 'text-slate-400 hover:bg-slate-700 hover:border-slate-600' : 'text-slate-600 hover:bg-slate-200 hover:border-slate-400'}`}>
        <XMarkIcon className="w-4 h-4 stroke-[2]" />
      </button>
    )
  }

export default CancelButton;