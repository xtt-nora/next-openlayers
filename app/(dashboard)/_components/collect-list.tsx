"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  {
    id: "0",
    title: "收藏",
    description: "一个收藏列表",
  },
  {
    id: "1",
    title: "想去",
    description: "想去的地点",
  },
  {
    id: "2",
    title: "双人",
    description: "双人成行",
  },
  {
    id: "3",
    title: "想去",
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

export const CollectList = () => {
  return (
    <div className="w-full flex flex-wrap">
      {data.map((collect, index) => (
        <div className="w-[350px] ml-3 mt-3" key={index}>
          <Card>
            <CardHeader>
              <CardTitle>{collect.title}</CardTitle>
              <CardDescription>{collect.description}</CardDescription>
            </CardHeader>
            {/* <CardContent>
          <form>
            <div className="grid w-full items-center gap-4"></div>
          </form>
        </CardContent> */}
            <CardFooter className="flesx justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
