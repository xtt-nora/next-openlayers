"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SetStateAction, useEffect, useState } from "react";
import { CollectList } from "./_components/collect-list";
import { MapList } from "./_components/map-list";
import { CreateDialog } from "./_components/create-dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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
      id: 2,
      title: "足迹",
    },
  ];
  const [value, setValue] = useState("收藏");
  const handleChange = (value: string) => {
    value && setValue(value);
  };
  const store = useMutation(api.user.store);
  useEffect(() => {
    const storeUser = async () => {
      await store({});
    };
    storeUser();
  }, [store]);
  return (
    <>
      <div className="flex flex-row flex-nowrap justify-between  items-center mb-2">
        <ToggleGroup size={"sm"} type="single" value={value} onValueChange={handleChange}>
          {list.map((item, index) => (
            <div key={index} className=" mt-1 mx-2">
              <ToggleGroupItem value={item.title}>{item.title}</ToggleGroupItem>
            </div>
          ))}
        </ToggleGroup>
        {/* {value === "我的地图" && <CreateDialog  value={value}/>} */}
        <CreateDialog value={value} />
      </div>
      {value === "收藏" && (
        <>
          <CollectList />
        </>
      )}
      {value === "我的地图" && (
        <>
          <MapList />
        </>
      )}
      {value === "足迹" && <>足迹</>}
    </>
  );
}
