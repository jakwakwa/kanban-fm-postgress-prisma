import { CheckIcon } from "@heroicons/react/24/outline";

const AddColumnConfirmButton = (
    {handleAddColumn, disabled, commonButtonClasses}: 
    {handleAddColumn: () => void, disabled: boolean, commonButtonClasses: string}
) => {
  return (


<button 
onClick={handleAddColumn}
disabled={disabled}
className={`bg-kpurple-main hover:bg-kpurple-light disabled:bg-slate-400 text-white ${commonButtonClasses}`}
>
<CheckIcon />
</button>
  )
}

export default AddColumnConfirmButton;