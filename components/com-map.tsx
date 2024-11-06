"use client";

import React from "react";
import { Component } from "react";
import { Feature, Map, View } from "ol";
import { defaults as defaultControls, FullScreen } from "ol/control";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useSearchModal } from "@/store/use-search-modal";
interface MapProps {
  resize?: boolean;
  width?: number | string;
  height?: number | string;
  center?: [number, number]; // [经度, 纬度]
  zoom?: number;
  search?: string;
}
interface State {
  zoomLevel: number;
}
export default class ComMap extends Component<MapProps, State> {
  static defaultProps = {
    resize: false,
    width: "100%",
    height: "100%",
    center: [0, 0], // 默认经纬度
    zoom: 4, // 默认 zoom 级别
  };
  private mapRef: React.RefObject<HTMLDivElement>;
  private map: Map | null;
  private vectorLayer: VectorLayer;
  constructor(props: MapProps) {
    super(props);
    this.state = {
      zoomLevel: props.zoom || 0,
    };
    this.mapRef = React.createRef();
    this.map = null;
    this.vectorLayer = new VectorLayer();
  }
  //初始化
  init = () => {
    if (!this.mapRef.current || this.map) return;
    const center = this.props.center || [0, 0];
    const olCenter = fromLonLat(center);
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    this.vectorLayer = new VectorLayer();
    this.map = new Map({
      target: this.mapRef.current as HTMLElement,
      layers: [osmLayer, this.vectorLayer],
      view: new View({
        center: olCenter,
        projection: "EPSG:4326",
        zoom: this.props.zoom,
      }),
      controls: defaultControls({
        zoom: false,
        rotate: false,
        attribution: false,
      }).extend([new FullScreen()]),
    });
  };
  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps: Readonly<MapProps>): void {
    if (this.props.search && this.props.search !== prevProps.search) {
      this.searchLocation(this.props.search);
    }
  }
  getMapStyle() {
    const { width, height } = this.props;
    return width || height ? { height: `${height}px`, width: `${width}px` } : { height: "100%", width: "100%" };
  }
  searchLocation = async (search: string) => {
    this.map?.removeLayer(this.vectorLayer);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      const location = [parseFloat(lon), parseFloat(lat)];
      this.map?.getView().setCenter(location);
      const newMarker = new Feature({
        geometry: new Point(location),
      });
      newMarker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "https://openlayers.org/en/latest/examples/data/icon.png", // 使用标记图标
          }),
        })
      );

      // 更新 vectorLayer 的 source，确保新的标记能够显示
      this.vectorLayer.setSource(new VectorSource({ features: [newMarker] }));

      this.map?.addLayer(this.vectorLayer);
    } else {
      alert("地点未找到！");
    }
  };
  render() {
    const mapStyle = this.getMapStyle();
    return <div ref={this.mapRef} style={mapStyle} className="w-full h-full"></div>;
  }
}
