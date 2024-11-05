"use client";

import { Component } from "react";

interface MapProps {
  resize?: boolean;
  width?: number | string;
  height?: number | string;
  center?: [number, number]; // [经度, 纬度]
  zoom?: number;
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
  constructor(props: MapProps) {
    super(props),
      (this.state = {
        zoomLevel: props.zoom || 0,
      });
  }

  render() {
    return <div>接收到的内容:{this.props.zoom}</div>;
  }
}
