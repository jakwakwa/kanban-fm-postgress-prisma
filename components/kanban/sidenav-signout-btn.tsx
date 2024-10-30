"use client";
import { SignOutButton } from "@clerk/nextjs";
import { PowerIcon } from "@heroicons/react/24/outline";
import useStore from "@/context/store";

const SideNavSignOutBtn = () => {
  const { darkMode } = useStore();
  return (
    <button className={`flex h-[48px] w-full grow items-center justify-center gap-2 ${darkMode ? 'text-[#828FA3] bg-[#2B2C37] hover:bg-[#3E3F4E] border-[#3E3F4E]' : 'text-default bg-white hover:bg-indigo-100 hover:text-indigo-600 border-kgray-border'} rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-6 md:px-6 border-t-2`}>
      <PowerIcon className="w-6" />
      <div className="hidden md:block">
        <SignOutButton />
      </div>
    </button>
  );
};

export default SideNavSignOutBtn;
