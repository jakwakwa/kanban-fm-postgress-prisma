import {  XMarkIcon } from "@heroicons/react/24/outline";



const CancelButton = ({darkMode, commonButtonClasses, onCancel}: {darkMode: boolean, commonButtonClasses: string, onCancel: () => void}) => {
    return (
      <button onClick={onCancel} className={`${commonButtonClasses} hover:underline border-[2px] border-slate-600`}>
        <XMarkIcon className="w-4 h-4" />
      </button>
    )
  }

export default CancelButton;