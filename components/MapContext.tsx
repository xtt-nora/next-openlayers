import React, { createContext, useContext, ReactNode } from "react";
import { Map } from "ol";

// 创建 MapContext
const MapContext = createContext<Map | null>(null);

// 使用 useContext 获取 map 实例
export const useMap = (): Map | null => {
  return useContext(MapContext);
};

// 修改 MapProvider 组件以接受 children
interface MapProviderProps {
  map: Map;
  children: ReactNode; // 显式声明 children 类型
}

// MapProvider 组件
export const MapProvider: React.FC<MapProviderProps> = ({ map, children }) => {
  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};
