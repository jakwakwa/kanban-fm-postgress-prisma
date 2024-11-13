"use client";
import React, { useState } from "react";
import  useStore  from "@/context/store";
import Image from "next/image";

const ThemeToggle = () => {

  const isDarkTheme = useStore((state) => state.darkMode);
  

  
  const toggleTheme = () => {
    useStore.getState().toggleTheme();
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button onClick={toggleTheme} className="w-full relative px-7 py-6">
      <div className="flex justify-start align-middle items-center gap-4 ">
        <Image
          alt=""
          width={10}
          height={10}
          className="w-4 h-4"
          src={
            isDarkTheme
              ? "/assets/icon-light-theme.svg"
              : "/assets/icon-dark-theme.svg"
          }
        />
        <div className=" text-slate-400 text-sm">
          {" "}
          {isDarkTheme ? "Light Mode" : "Dark Mode"}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
