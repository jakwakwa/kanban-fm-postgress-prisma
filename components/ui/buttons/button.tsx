import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  isDisabled?: boolean;
}

const Button = ({
  href,
  children,
  variant,
  isDisabled = true,
}: ButtonProps) => {
  return (
    <div>
      <Link href={href}>
        <button
          className={`${isDisabled && "bg-kpurple-light cursor-not-allowed"} ${
            variant
              ? "bg-white border border-indigo-600 text-indigo-600 text-xs hover:bg-slate-100 transition-colors ease-in-out duration-75  px-2 py-1"
              : "bg-kpurple-main hover:bg-slate-500 text-white px-5 py-3"
          } rounded-3xl text-md text-sm font-semibold `}
        >
          {children}
        </button>
      </Link>
    </div>
  );
};

export default Button;
