import Image from "next/image";

export default function Logo() {
  return (
    <div className={`flex flex-row items-center leading-none text-black`}>
      <Image
        src="/assets/logo-dark.svg"
        width={1000}
        height={760}
        alt="Screenshots of the dashboard project showing desktop version"
        className="hidden md:block"
      />
    </div>
  );
}
