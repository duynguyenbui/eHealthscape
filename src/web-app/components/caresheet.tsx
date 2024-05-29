import { currentUser } from "@/actions/token";
import React from "react";

export const CareSheet = async () => {
  const user = await currentUser();

  return <div>{JSON.stringify(user)}</div>;
};
