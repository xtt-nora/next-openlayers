"use client";
import { SearchInput } from "@/app/(dashboard)/_components/search-input";
import ComMap from "@/components/com-map";
import React, { useState } from "react";
import { use } from "react";
import { useSearchModal } from "@/store/use-search-modal";
import { useSaveEvent } from "@/hooks/useAddEvent";

interface MapParams {
  collectid: string | number;
}

interface MapProps {
  params: Promise<MapParams>;
}

const CollectPage = ({ params }: MapProps) => {
  const unwrappedParams = use(params);
  const { search } = useSearchModal();
  const { saveEvent } = useSaveEvent();
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-[270px] h-full">{unwrappedParams.collectid}</div>
      <div className="w-[calc(100%-271px)]  h-full relative">
        <div className="absolute top-[10px] left-[10px]  z-[99999] w-30%">
          <SearchInput />
        </div>
        <ComMap zoom={4} search={search} isadd={false} saveEvent={saveEvent} />
      </div>
    </div>
  );
};
export default CollectPage;
