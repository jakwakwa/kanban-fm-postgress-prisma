"use client";
import { SignOutButton } from "@clerk/nextjs";
import { PowerIcon } from "@heroicons/react/24/outline";

const SideNavSignOutBtn = () => {
  return (
    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 text-white dark:text-[#828FA3] rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-6 md:px-6 bg-white dark:bg-[#2B2C37] hover:bg-indigo-100 dark:hover:bg-[#3E3F4E] hover:text-indigo-600 border-t-2 border-kgray-border dark:border-kgray-border dark:border-[#3E3F4E]">
      <PowerIcon className="w-6" />
      <div className="hidden md:block">
        <SignOutButton />
      </div>
    </button>
  );
};

export default SideNavSignOutBtn;
