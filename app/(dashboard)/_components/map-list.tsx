"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyholeOpen } from "lucide-react";

const data = [
  {
    id: "0",
    title: "东京",
    description: "地图1",
  },
  {
    id: "1",
    title: "东南亚",
    description: "12月旅行计划",
  },
  {
    id: "2",
    title: "澳大利亚",
    description: "双人成行",
  },
  {
    id: "3",
    title: "济州岛",
    description: "想去的地点",
  },
  {
    id: "4",
    title: "双人",
    description: "双人成行",
  },
  {
    id: "5",
    title: "想去",
    description: "想去的地点",
  },
  {
    id: "6",
    title: "双人",
    description: "双人成行",
  },
  {
    id: "7",
    title: "想去",
    description: "想去的地点",
  },
  {
    id: "8",
    title: "双人",
    description: "双人成行",
  },
  {
    id: "0",
    title: "东京",
    description: "地图1",
  },
  {
    id: "1",
    title: "东南亚",
    description: "12月旅行计划",
  },
  {
    id: "2",
    title: "澳大利亚",
    description: "双人成行",
  },
  {
    id: "3",
    title: "济州岛",
    description: "想去的地点",
  },
  {
    id: "4",
    title: "双人",
    description: "双人成行",
  },
  {
    id: "5",
    title: "想去",
    description: "想去的地点",
  },
  {
    id: "6",
    title: "双人",
    description: "双人成行",
  },
  {
    id: "7",
    title: "想去",
    description: "想去的地点",
  },
  {
    id: "8",
    title: "双人",
    description: "双人成行",
  },
];

export const MapList = () => {
  return (
    <div className="w-full flex h-[calc(100%-120px)] overflow-auto flex-wrap">
      {data.map((collect, index) => (
        <div className="w-[350px] ml-2 mt-3" key={index}>
          <Card>
            <CardHeader>
              <CardTitle>{collect.title}</CardTitle>
              <CardDescription>{collect.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flesx justify-between">
              <Button variant="outline">删除</Button>
              <Button>
                <LockKeyholeOpen />
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
