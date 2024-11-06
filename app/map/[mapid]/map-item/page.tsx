"use client";

import Navbar from "@/app/(dashboard)/_components/navbar";
import { SearchInput } from "@/app/(dashboard)/_components/search-input";
import ComMap from "@/components/com-map";
import React, { useState } from "react";
import { use } from "react";
import { RoutePlan } from "./_components/route-plan";
import { useSearchModal } from "@/store/use-search-modal";

interface MapParams {
  mapid: string | number;
}

interface MapProps {
  params: Promise<MapParams>;
}

const MapPage = ({ params }: MapProps) => {
  const unwrappedParams = use(params);
  const [content, setContent] = useState(4);
  const { search } = useSearchModal();
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-[270px] h-full">
        <RoutePlan />
      </div>
      <div className="w-[calc(100%-271px)]  h-full relative">
        <div className="absolute top-[10px] left-[10px]  z-[99999] w-30%">
          <SearchInput />
        </div>
        <ComMap zoom={content} search={search} />
      </div>
    </div>
  );
};
export default MapPage;
