"use client";

import { Badge } from "./ui/badge";

export const BloodTypes = () => {
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="flex items-center gap-2">
      {bloodTypes.map((type) => (
        <div key={type} className="p-2 rounded">
          <Badge>{type}</Badge>
        </div>
      ))}
    </div>
  );
};
