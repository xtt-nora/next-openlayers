"use client";

import React from "react";
import { use } from "react";

interface MapParams {
  mapid: string | number;
}

interface MapProps {
  params: Promise<MapParams>;
}

const MapPage = ({ params }: MapProps) => {
  const unwrappedParams = use(params);
  const mapRef = React.createRef<HTMLDivElement>();
  return (
    <div>
      {/* <div>{unwrappedParams.mapid}</div> */}
      <div ref={mapRef} className="w-full h-full bg-slate-400"></div>
    </div>
  );
};
export default MapPage;
