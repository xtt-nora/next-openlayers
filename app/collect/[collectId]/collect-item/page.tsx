"use client";
import { SearchInput } from "@/app/(dashboard)/_components/search-input";
import ComMap from "@/components/com-map";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useSearchModal } from "@/store/use-search-modal";
import { useSaveEvent } from "@/hooks/useAddEvent";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { List, Undo2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CollectParams {
  collectId: Id<"collect">;
}
type DataType = {
  _id: string;
  _creationTime: number;
  collectList?:
    | {
        point?: number[] | undefined;
        name: string;
      }[]
    | undefined;
  userId: string;
  badge: string;
  collectName: string;
};

interface CollectProps {
  params: Promise<CollectParams>;
}

const CollectPage = ({ params }: CollectProps) => {
  const unwrappedParams = use(params);
  const collectData = useQuery(api.collect.getById, { id: unwrappedParams.collectId });

  const [data, setData] = useState<DataType | null>(null);
  useEffect(() => {
    if (collectData) setData(collectData);
  }, [collectData]);
  const { search } = useSearchModal();
  const { saveEvent } = useSaveEvent();
  return (
    <div className="w-full h-full flex flex-row">
      {data && (
        <div className="w-[270px] h-full">
          <div className="mt-4 px-2">
            <Undo2 size={32} />
          </div>
          <Separator className="my-4" />
          <div className="flex flex-row flex-nowrap px-2">
            <List />
            <span className=" text-lg font-black inline-block ml-1">{data.collectName}</span>
          </div>
        </div>
      )}
      <div className="w-[calc(100%-271px)]  h-full relative">
        <div className="absolute top-[10px] left-[10px]  z-[99999] w-30%">
          <SearchInput />
        </div>
        {/* <ComMap zoom={4} search={search} isadd={false} saveEvent={saveEvent} /> */}
      </div>
    </div>
  );
};
export default CollectPage;
