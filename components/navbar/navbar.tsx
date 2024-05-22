import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../theme-toggle/theme-toggle";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center flex-row p-4">
      <Link href="/">
        <p className="text-xl cursor-pointer text-center font-bold text-slate-500">
          shopix
        </p>
      </Link>
      <ThemeToggle/>
    </div>
  );
};

export default Navbar;
