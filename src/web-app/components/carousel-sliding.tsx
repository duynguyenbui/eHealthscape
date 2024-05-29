"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import Link from "next/link";

export function CarouselSliding() {
  const variants = [
    "default",
    "premium",
    "secondary",
    "destructive",
    "outline",
  ];

  const cardContents = [
    {
      title: "View Patient Information",
      description: "Access comprehensive patient records.",
      content:
        "Review the patient's medical history, current medications, and previous diagnoses to provide optimal care.",
      link: "/patients",
    },
    {
      title: "Health Record Introduction",
      description: "Access comprehensive health records related to patients.",
      content:
        "Review patients' medical histories, current medications, and previous diagnoses to provide optimal care.",
      link: "/healthrecords",
    },
    {
      title: "Add Care Sheet",
      description: "Track patient progress.",
      content:
        "Add and update care sheets to maintain detailed records of the patient's progress over time.",
      link: "/patients",
    },
    {
      title: "Add Examination",
      description: "Document treatment plans.",
      content:
        "Complete treatment forms to outline and document the patient's treatment plan, including medications and procedures.",
      link: "/patients",
    },
    {
      title: "Add Vital Signs",
      description: "Add vital signs to the patient's",
      content:
        "Conduct a thorough health assessment to monitor and maintain your overall well-being. This includes checking vital signs, conducting necessary tests, and reviewing your medical history.",
      link: "/patients",
    },
    {
      title: "Health Check-up",
      description: "Comprehensive health examination.",
      content:
        "Conduct a thorough health assessment to monitor and maintain your overall well-being. This includes checking vital signs, conducting necessary tests, and reviewing your medical history.",
      link: "/health-check-up",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full h-full"
    >
      <CarouselContent className="-ml-4">
        {cardContents.map((card, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
            <Card className="md:w-[300px] md:h-[400px] relative">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{card.content}</p>
              </CardContent>
              <CardFooter className="md:absolute bottom-0 left-0 w-full flex justify-between p-4 ">
                <Link href={card.link}>
                  <Button variant={variants[index] as any}>Proceed</Button>
                </Link>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
