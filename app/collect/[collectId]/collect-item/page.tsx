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
import {
  Calculator,
  Calendar,
  Cctv,
  CreditCard,
  GitBranchPlus,
  List,
  MapPinCheck,
  MapPinMinus,
  Settings,
  Smile,
  Undo2,
  User,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useCollectModal } from "@/store/use-collect-modal";

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
        order: number;
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
  const { updateCollectId, collectId } = useCollectModal();
  const unwrappedParams = use(params);
  useEffect(() => {
    if (collectId !== unwrappedParams.collectId) {
      updateCollectId(unwrappedParams.collectId);
    }
  }, [unwrappedParams.collectId, collectId, updateCollectId]);
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
        <div className="w-[450px] h-full">
          <div className="mt-4 px-2">
            <Undo2 size={32} />
          </div>
          <Separator className="my-4" />
          <div className="flex flex-row flex-nowrap px-2 h-[30px] leading-[30px] items-center">
            <Cctv />
            <span className=" text-[20px] font-black inline-block ml-1">{data.collectName}</span>
          </div>
          <Separator className="my-4" />
          <div className=" px-2">
            <Command className="rounded-lg border shadow-md md:min-w-[440px]">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="收藏列表">
                  {collectData?.collectList?.map((item) => (
                    <CommandItem key={item.order} className=" relative">
                      <MapPinCheck />
                      <span>{item.name}</span>
                      <div className=" absolute right-1">
                        <Button variant="ghost" size="icon" className=" h-[24px]">
                          <GitBranchPlus />
                        </Button>
                        <Button variant="ghost" size="icon" className=" h-[24px]">
                          <MapPinMinus color="red" />
                        </Button>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      )}
      <div className="w-[calc(100%-451px)]  h-full relative">
        <div className="absolute top-[10px] left-[10px]  z-[99999] w-30%">
          <SearchInput />
        </div>
        <ComMap zoom={4} search={search} isadd={false} saveEvent={saveEvent} />
      </div>
    </div>
  );
};
export default CollectPage;
