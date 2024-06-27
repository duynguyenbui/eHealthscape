"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowBigLeft } from "lucide-react";

export const BackButton = ({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) => {
  const router = useRouter();
  return (
    <div>
      <Button
        className={className}
        variant={"ghost"}
        onClick={() => router.back()}
      >
        <ArrowBigLeft />
        Back
      </Button>
    </div>
  );
};
