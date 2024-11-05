"use client";

import ComMap from "@/components/com-map";
import React, { useState } from "react";
import { use } from "react";

interface MapParams {
  mapid: string | number;
}

interface MapProps {
  params: Promise<MapParams>;
}

const MapPage = ({ params }: MapProps) => {
  const unwrappedParams = use(params);
  const [content, setContent] = useState(2);
  const mapRef = React.createRef<HTMLDivElement>();
  return (
    <div>
      <div>{unwrappedParams.mapid}</div>
      {/* <div ref={mapRef} className="w-full h-full bg-slate-400"></div> */}
      <ComMap zoom={content} />
    </div>
  );
};
export default MapPage;
