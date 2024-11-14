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
    base: "w-full box-border w-full bg-slate-100 placeholder:text-xs placeholder:text-slate-400 placeholder:italic shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-slate-600 bg-slate-100 shadow-[0_0_0_1px_#cbd5e122] focus:text-slate-400 focus:bg-slate-100 text-slate-600 focus:outline-none focus:border-none focus:outline-purple-700 active:outline-[#613dcc] active:outline-[2px] active:border-none selection:color-white selection:bg-[#613dcc]",
    dark: "w-full box-border w-full bg-[#3d3f4f] text-white border-[#3E3F4E] placeholder:text-xs placeholder:text-slate-400 placeholder:italic shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px_#cbd5e122] focus:outline-none focus:border-none focus:bg-slate-600 outline-none hover:shadow-[0_0_0_1px_black] focus:outline-purple-700 selection:color-white selection:bg-[#613dcc] hover:bg-[#3e3f4a]",
 
  },
  dropdown: {
    base: "w-[200px] text-left box-border w-full bg-slate-100 placeholder:text-xs placeholder:text-slate-400 placeholder:italic shadow-blackA6 inline-flex appearance-none items-center justify-start rounded-[4px] p-[10px] text-[15px] leading-none text-slate-600 bg-slate-100 shadow-[0_0_0_1px_#cbd5e122] focus:text-slate-400 focus:bg-slate-100 text-slate-600 focus:outline-none focus:border-none focus:outline-purple-700 active:outline-[#613dcc] active:outline-[2px] active:border-none selection:color-white selection:bg-[#613dcc]",
    dark: "text-left w-[200px] box-border w-full bg-[#3d3f4f] text-white border-[#3E3F4E] placeholder:text-xs placeholder:text-slate-400 placeholder:italic shadow-blackA6 inline-flex appearance-none items-center justify-start rounded-[4px] p-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px_#cbd5e122] focus:outline-none focus:border-none focus:bg-slate-600 outline-none hover:shadow-[0_0_0_1px_black] focus:outline-purple-700 selection:color-white selection:bg-[#613dcc] hover:bg-[#3e3f4a]"
  }
} as const; 
