export const addColumnContainerClasses = {
  light: 'bg-[#f3f4fd22] border-dashed border-slate-300',
  dark: 'border-slate-500 border-dashed border-slate-700',
  active: 'border-2 border-slate-200',
  default: 'border-none'
} as const;

export const commonClasses = {
  overflow: "overflow-y-auto overflow-x-hidden",
  flex: "flex flex-col items-center justify-center",
  button: "px-4 py-2 rounded-md",
  iconButton: "p-2 rounded-md w-10 h-9 mt-[2px] ml-[2px] disabled:opacity-30 transition-all",
  border: "border-2 rounded-lg",
  input: {
    base: "w-full px-3 py-2 shadow-[0_0_0_1px_#0000003a] rounded-md mr-1 focus:outline-none focus:border-none focus:outline-indigo-700 active:outline-kpurple-main active:outline-[2px] active:border-none focus:bg-slate-100 active:bg-slate-200",
    dark: "bg-slate-800 shadow-[0_0_0_1px_#cbd5e122] focus:text-slate-400 focus:bg-slate-800 text-slate-600 focus:outline-none focus:border-none focus:outline-indigo-700 active:outline-kpurple-main active:outline-[2px] active:border-none"
  }
} as const; 