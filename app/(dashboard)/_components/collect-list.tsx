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
];

export const CollectList = () => {
  return (
    <div className=" grid gap-x-3 gap-y-3">
      {data.map((collect, index) => (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{collect.title}</CardTitle>
            <CardDescription>{collect.description}</CardDescription>
          </CardHeader>
          {/* <CardContent>
          <form>
            <div className="grid w-full items-center gap-4"></div>
          </form>
        </CardContent> */}
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
