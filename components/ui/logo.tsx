import Image from "next/image";

export default function Logo() {
  return (
    <div className={`flex flex-row items-center leading-none`}>
      <Image
        src="/assets/logo-dark.svg"
        width={1000}
        height={760}
        alt="Logo - Dark variant"
        className="hidden dark:hidden md:block"
      />
      <Image
        src="/assets/logo-light.svg"
        width={1000}
        height={760}
        alt="Logo - Light variant"
        className="hidden dark:md:block"
      />
    </div>
  );
}

