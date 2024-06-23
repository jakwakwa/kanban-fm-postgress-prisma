import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  isDisabled?: boolean;
  onClick?: any;
  isClickEvent: boolean;
}

const Button = ({
  children,
  variant,
  onClick,
  isDisabled = true,
  isClickEvent,
}: ButtonProps) => {
  if (!isClickEvent && variant !== "primary") {
    return (
      <button
        className={`${isDisabled && "bg-kpurple-light cursor-not-allowed"} ${
          variant
            ? "bg-white border border-indigo-600 text-indigo-600 text-xs hover:bg-slate-100 transition-colors ease-in-out duration-75  px-2 py-1"
            : "bg-kpurple-main hover:bg-slate-500 text-white px-5 py-3"
        } rounded-3xl text-md text-sm font-semibold `}
      >
        {children}
      </button>
    );
  }
  if (isClickEvent) {
    return (
      <button
        onClick={onClick}
        className={`${isDisabled && "bg-kpurple-light cursor-not-allowed"} ${
          variant
            ? "bg-white border border-indigo-600 text-indigo-600 text-xs hover:bg-slate-100 transition-colors ease-in-out duration-75  px-2 py-1"
            : "bg-kpurple-main hover:bg-slate-500 text-white px-5 py-3"
        } rounded-3xl text-md text-sm font-semibold `}
      >
        {children}
      </button>
    );
  }
  if (!isClickEvent && variant === "secondary") {
    return (
      <button
        className={
          variant
            ? "bg-white border border-indigo-600 text-indigo-600 text-xs hover:bg-slate-100 transition-colors ease-in-out duration-75  px-2 py-1"
            : "bg-kpurple-main hover:bg-slate-500 text-white px-5 py-3 rounded-3xl text-md text-sm font-semibold"
        }
      >
        {children}
      </button>
    );
  }
};

export default Button;
