import React from "react";
import { TypographyH2, TypographyH4, TypographyP } from "./typography";
import { Separator } from "@/components/ui/separator";
import { TGuide } from "@/lib/database/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BodyAdScript from "../global/ad";

const Guide = ({ guides }: { guides: TGuide[] }) => {
  return (
    <>
      <div className="my-11">
        <TypographyH2 className="text-3xl font-bold text-center my-8 text-primary">
          How to use
        </TypographyH2>
        <div className="flex justify-between items-center gap-5 flex-wrap md:flex-nowrap">
          {guides?.length > 0 &&
            guides.map((guide, i) => {
              return (
                <Card key={i} className="grow">
                  <CardHeader>
                    <div className="bg-primary/30 text-primary w-14 h-14 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold select-none">
                        {i + 1}
                      </span>
                    </div>
                    <CardTitle>{guide?.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{guide?.desc}</CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Guide;