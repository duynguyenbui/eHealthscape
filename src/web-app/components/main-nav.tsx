"use client";

import React from "react";
import { CustomLink } from "./custom-link";
import { Button } from "./ui/button";
import Image from "next/image";

export const MainNav = () => {
  return (
    <div className="flex gap-4 items-center">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0">
          <Image
            src="/logo.svg"
            alt="Home"
            width="32"
            height="32"
            className="min-w-8"
          />
        </Button>
      </CustomLink>
      <h1 className="font-bold text-blue-500">Health Record Services</h1>
    </div>
  );
};
