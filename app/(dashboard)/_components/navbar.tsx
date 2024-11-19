"use client";

import { UserButton } from "@clerk/nextjs";
import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { SearchInput } from "./search-input";

const Navbar = () => {
  return (
    <>
      <Separator />
      <div className="flex items-center gap-x-4 p-5 bg-white">
        <div className="hidden lg:flex lg:flex-1">{/* <SearchInput /> */}</div>
        <UserButton />
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
