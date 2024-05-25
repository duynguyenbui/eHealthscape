import React from "react";

const HealthRecordIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="w-full pt-16">{children}</main>
    </div>
  );
};

export default HealthRecordIdLayout;
