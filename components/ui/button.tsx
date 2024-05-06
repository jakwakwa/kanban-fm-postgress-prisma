"use-client";
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
          className={`${
            isDisabled
              ? "bg-kpurple-light cursor-not-allowed"
              : "bg-kpurple-main hover:bg-slate-500"
          } px-5 py-3 rounded-3xl text-md text-white text-sm font-semibold `}
        >
          {children}
        </button>
      </Link>
    </div>
  );
};

export default Button;
