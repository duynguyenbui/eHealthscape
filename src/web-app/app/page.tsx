import { currentUser, getAccessToken } from "@/actions/token";
import { CarouselSliding } from "@/components/carousel-sliding";
import React from "react";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="mt-4">
      {user && (
        <>
          <h1 className="text-2xl font-bold text-blue-500">
            Hello {user?.name}, welcome to Health Record Service 🫠 🫠
          </h1>
          <span className="text-muted-foreground">{user.email}</span>
        </>
      )}
      <div className="flex items-center h-full w-full mt-20">
        <CarouselSliding />
      </div>
    </div>
  );
}
