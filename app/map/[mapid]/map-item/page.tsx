"use client";

import { use } from "react";

interface MapParams {
  mapid: string | number;
}

interface MapProps {
  params: Promise<MapParams>;
}

const MapPage = ({ params }: MapProps) => {
  const unwrappedParams = use(params);

  return <div>{unwrappedParams.mapid}</div>;
};
export default MapPage;
