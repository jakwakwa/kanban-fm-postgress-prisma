interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  isDisabled?: boolean;
  onClick?: () => void;
  isClickEvent: boolean;
  isDarkMode: boolean;
}

const Button = ({
  children,
  variant,
  onClick,
  isDisabled = true,
  isClickEvent,
  isDarkMode ,
}: ButtonProps) => {
  const getButtonStyles = () => {

    return variant
      ? `border ${ isDarkMode ? "bg-[#635FC7] hover:bg-[#635FC7]/80 text-white" : " bg-white hover:bg-slate-100 text-indigo-600" } border-none text-xs hover:bg-slate-100 transition-colors ease-in-out duration-75 px-2 py-1`
      : "bg-kpurple-main hover:bg-slate-500 text-white px-5 py-3";
  };

  const baseClasses = `${isDisabled && "bg-kpurple-light cursor-not-allowed"} ${getButtonStyles()} rounded-3xl text-md text-sm font-semibold`;

  if (isClickEvent) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {children}
      </button>
    );
  }

  return (
    <button className={baseClasses}>
      {children}
    </button>
  );
};

export default Button;
