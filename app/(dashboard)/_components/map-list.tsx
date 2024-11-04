"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useState } from "react";

const initdata = [
  {
    id: "0",
    title: "东京",
    description: "地图1",
    isLocked: false,
  },
  {
    id: "1",
    title: "东南亚",
    description: "12月旅行计划",
    isLocked: false,
  },
  {
    id: "2",
    title: "澳大利亚",
    description: "双人成行",
    isLocked: false,
  },
  {
    id: "3",
    title: "济州岛",
    description: "想去的地点",
    isLocked: true,
  },
  {
    id: "4",
    title: "双人",
    description: "双人成行",
    isLocked: true,
  },
  {
    id: "5",
    title: "想去",
    description: "想去的地点",
    isLocked: true,
  },
  {
    id: "6",
    title: "双人",
    description: "双人成行",
    isLocked: false,
  },
  {
    id: "7",
    title: "想去",
    description: "想去的地点",
    isLocked: false,
  },
  {
    id: "8",
    title: "双人",
    description: "双人成行",
    isLocked: false,
  },
  {
    id: "9",
    title: "东京",
    description: "地图1",
    isLocked: false,
  },
  {
    id: "10",
    title: "东南亚",
    description: "12月旅行计划",
    isLocked: true,
  },
  {
    id: "11",
    title: "澳大利亚",
    description: "双人成行",
    isLocked: false,
  },
  {
    id: "13",
    title: "济州岛",
    description: "想去的地点",
    isLocked: false,
  },
  {
    id: "14",
    title: "双人",
    description: "双人成行",
    isLocked: false,
  },
  {
    id: "15",
    title: "想去",
    description: "想去的地点",
    isLocked: false,
  },
  {
    id: "16",
    title: "双人",
    description: "双人成行",
    isLocked: true,
  },
  {
    id: "17",
    title: "想去",
    description: "想去的地点",
    isLocked: false,
  },
  {
    id: "18",
    title: "双人",
    description: "双人成行",
    isLocked: false,
  },
];

export const MapList = () => {
  const [data, setData] = useState(initdata);
  const updateLocked = (collect: any) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === collect.id ? { ...item, isLocked: !item.isLocked } : item))
    );
  };
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
              <div onClick={() => updateLocked(collect)}>
                {collect.isLocked ? <LockKeyhole /> : <LockKeyholeOpen />}
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
