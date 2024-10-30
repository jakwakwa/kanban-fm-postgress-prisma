import Image from "next/image";
import useStore from "@/context/store";

export default function Logo() {
  const { darkMode } = useStore();
  return (
    <div className={`flex flex-row items-center leading-none`}>
        <Image src={darkMode ? "/assets/logo-light.svg" : "/assets/logo-dark.svg"} alt="Logo" width={1000} height={760} />
    </div>
  );
}

