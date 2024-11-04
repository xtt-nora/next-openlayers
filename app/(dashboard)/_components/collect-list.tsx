"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useState } from "react";
import { initdata } from "./data";
export const CollectList = () => {
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
