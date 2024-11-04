"use client";

import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
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
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 pt-4 pb-1">
      {data.map((collect, index) => (
        <div
          className="flex text-inherit no-underline select-none transition w-full bg-white duration-100 ease-out cursor-pointer shadow-[rgba(15,15,15,0.07)_0px_0px_0px_1px,rgba(15,15,15,0.05)_0px_2px_4px] rounded-[10px] overflow-hidden static h-full flex-col"
          key={index}
        >
          <div className=" w-full h-[150px]">
            <img src="https://github.com/shadcn.png" className="w-full h-full" />
          </div>
          <div>{collect.title}</div>
          <div></div>
        </div>
      ))}
    </div>
  );
};
