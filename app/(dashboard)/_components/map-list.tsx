"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { mapData } from "./data";
import { LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react";

export const MapList = () => {
  const [data, setData] = useState(mapData);
  const deleteItem = (collect: any) => {
    setData((prevData) => prevData.filter((item) => item.id !== collect.id));
  };
  const updateLocked = (collect: any) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === collect.id ? { ...item, isLocked: !item.isLocked } : item))
    );
  };
  return (
    <div className=" overflow-auto h-[calc(100%-120px)] ">
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4 pt-4 pb-1">
        {data.map((collect, index) => (
          <div
            className="group flex relative text-inherit no-underline select-none transition w-full bg-white duration-100 ease-out cursor-pointer shadow-[rgba(15,15,15,0.07)_0px_0px_0px_1px,rgba(15,15,15,0.05)_0px_2px_4px] rounded-[10px] overflow-hidden static h-full flex-col"
            key={index}
          >
            <div className=" w-full h-[150px]">
              <img src={collect.bgImg} className="w-full h-full" />
              <div className=" border-b border-b-[rgba(55,53,47,0.09)]"></div>
            </div>
            <div className="flex p-2 relative">
              <div className="w-6 h-6 rounded items-center justify-center flex">
                <img src={collect.img} className=" w-3 h-3" />
              </div>
              <div className=" whitespace-nowrap overflow-hidden text-ellipsis">{collect.title}</div>
            </div>
            <div>
              <div className=" pb-2 pl-2">
                <Badge variant="secondary">{collect.badge}</Badge>
              </div>
            </div>
            <div className=" absolute right-2 top-1 bg-white w-11 h-6  flex  items-center justify-evenly border-[rgba(55,53,47,0.09)] rounded-[3px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div onClick={() => updateLocked(collect)}>
                {collect.isLocked ? <LockKeyhole color="#ce2c2c" size={16} /> : <LockKeyholeOpen size={16} />}
              </div>
              <div className=" border-r h-6  border-r-[rgba(55,53,47,0.09)]"></div>
              <div onClick={() => deleteItem(collect)}>
                <Trash2 size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
