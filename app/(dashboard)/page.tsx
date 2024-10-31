"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

export default function Home() {
  const list = [
    {
      id: 0,
      title: "收藏",
    },
    {
      id: 1,
      title: "我的地图",
    },
    {
      id: 1,
      title: "足迹",
    },
  ];
  const [value, setValue] = useState("收藏");
  const handleChange = (value: string) => {
    value && setValue(value);
  };
  return (
    <>
      <div className="flex flex-row flex-nowrap justify-start">
        <ToggleGroup size={"sm"} type="single" value={value} onValueChange={handleChange}>
          {list.map((item, index) => (
            <div key={index} className=" mt-1 mx-2">
              <ToggleGroupItem value={item.title}>{item.title}</ToggleGroupItem>
            </div>
          ))}
        </ToggleGroup>
      </div>
      {value === "收藏" && <>收藏</>}
      {value === "我的地图" && <>我的地图</>}
      {value === "足迹" && <>足迹</>}
    </>
  );
}
