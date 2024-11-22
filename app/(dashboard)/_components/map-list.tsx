"use client";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loading } from "@/components/auth/loading";
import { ConvexImage } from "@/components/convex-image";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
type MapDataItem = {
  _id: string;
  _creationTime: number;
  title: string;
  userId: string;
  description: string;
  badge: string;
  img: string;
  bgImg: string;
  isLocked: boolean;
};

export const MapList = () => {
  const mapsData = useQuery(api.map.get);
  const { mutate: del, pending: delPending } = useApiMutation(api.map.del);
  const { mutate: updateLock, pending: updatePending } = useApiMutation(api.map.updateLocked);
  const [data, setData] = useState<MapDataItem[]>([]);
  useEffect(() => {
    if (mapsData) setData(mapsData);
  }, [mapsData]);
  const router = useRouter();
  const deleteItem = (collect: any) => {
    setData((prevData) => prevData.filter((item) => item._id !== collect._id));
    del({ mapId: collect._id });
  };
  const updateLocked = (collect: any) => {
    setData((prevData) =>
      prevData.map((item) => (item._id === collect._id ? { ...item, isLocked: !item.isLocked } : item))
    );
    updateLock({ mapId: collect._id });
  };
  if (!mapsData) {
    return (
      <div className="w-full h-[calc(100%-120px)] flex justify-center items-center">
        <Loading />
      </div>
    ); // 数据加载时显示的内容
  }
  return (
    <div className=" overflow-auto h-[calc(100%-120px)] ">
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4 pt-4 pb-1">
        {data?.map((collect, index) => (
          <div
            className="group flex relative text-inherit no-underline select-none transition w-full bg-white duration-100 ease-out cursor-pointer shadow-[rgba(15,15,15,0.07)_0px_0px_0px_1px,rgba(15,15,15,0.05)_0px_2px_4px] rounded-[10px] overflow-hidden static h-full flex-col"
            key={index}
            onClick={() => !collect.isLocked && router.push(`/map/${collect._id}/map-item`)}
          >
            <div className=" w-full h-[150px]">
              {/* <img src={collect.bgImg} className="w-full h-full" /> */}
              <ConvexImage storageId={collect.bgImg} title="图片" />
              <div className=" border-b border-b-[rgba(55,53,47,0.09)]"></div>
            </div>
            <div className="flex p-2 relative">
              <div className="w-6 h-6 rounded items-center justify-center flex">
                <img src={collect.img} className=" w-3 h-3" />
              </div>
              <div className=" whitespace-nowrap overflow-hidden text-ellipsis">{collect.title}</div>
            </div>
            <div className=" z-[20]">
              <div className=" pb-2 pl-2">
                <Badge variant="secondary">{collect.badge}</Badge>
              </div>
            </div>
            <div className=" absolute right-2 top-1 bg-white w-11 h-6  flex  items-center justify-evenly border-[rgba(55,53,47,0.09)] rounded-[3px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  updateLocked(collect);
                }}
              >
                {collect.isLocked ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <LockKeyhole color="#ce2c2c" size={16} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Lock to prevent access to edit data </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <LockKeyholeOpen size={16} />
                )}
              </div>
              <div className=" border-r h-6  border-r-[rgba(55,53,47,0.09)]"></div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(collect);
                }}
              >
                <Trash2 size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
