"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { DoorOpen, LogOut, User2 } from "lucide-react";

export const UserButton = () => {
  const session = useSession();

  if (session.data) {
    return (
      <div className="flex gap-2 items-center">
        <Button onClick={() => signOut()} variant="secondary">
          <LogOut className="mr-2 h-4 w-4" /> SignOut
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={() => signIn("id-server")} variant="premium">
        <DoorOpen className="mr-2 h-4 w-4" /> SignIn
      </Button>
    </div>
  );
};
