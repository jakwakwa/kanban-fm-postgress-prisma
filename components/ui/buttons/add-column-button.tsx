import React from 'react';

const columnButtonClasses = "text-center text-kpurple-main text-xs p-2 rounded-full mt-2 border border-kpurple-main";

function AddColumnButton({setAddingColumn}: {setAddingColumn: (value: boolean) => void}) {
  return (
    <button 
      onClick={() => setAddingColumn(true)}
      className={columnButtonClasses}
    >
      + new column
    </button>
  )
}

export default AddColumnButton;


