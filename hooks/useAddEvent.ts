import { useRouteplanModal } from "@/store/use-route-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Feature, Map } from "ol";
import VectorSource from "ol/source/Vector";
import { LineString, Point } from "ol/geom";
import { Fill, Icon, Stroke, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import CircleStyle from "ol/style/Circle";
import { getVectorContext } from "ol/render";
export const useAddEvent = () => {
  const { routeplanId } = useRouteplanModal();
  const { mutate, pending } = useApiMutation(api.routeplan.addSubRoute);

  const addEvent = (data: any) => {
    mutate({
      routeplanId: routeplanId,
      name: data[0].name,
      point: [parseFloat(data[0].lon), parseFloat(data[0].lat)],
      order: Math.random(),
    })
      .then(() => {
        toast.info("Gig created successfully");
      })
      .catch(() => {
        toast.error("Failed to create gig");
      });
  };
  const createLineEvent = (
    item: {
      routeName?: string;
      _id: any;
      isEdit?: boolean;
      isSelected?: boolean;
      routerColor?: string;
      routerGroup?: any;
    },
    map: Map | null,
    isRun: boolean
  ) => {
    let lastTime: any;
    let distance = 0;
    if (!item.routerGroup || !map) return;
    const coordinates = item.routerGroup?.map((point: { point: any }) => point.point);
    if (!coordinates) return;
    const route = new LineString(coordinates);
    const routeFeature = new Feature({
      type: "route",
      geometry: route,
    });
    // const routePoint  = new
    const markerList: Feature<Point>[] = [];
    coordinates.map((point: any) => {
      markerList.push(
        new Feature({
          type: "icon",
          geometry: new Point(point),
        })
      );
    });
    const position = markerList[0]?.getGeometry()?.clone() || new Point(coordinates[0]);
    const geoMarker = new Feature({
      type: "geoMarker",
      geometry: position,
    });
    const styles = {
      route: new Style({
        stroke: new Stroke({
          color: item.routerColor || "blue",
          width: 4,
        }),
      }),
      icon: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "/pin.png",
        }),
      }),
      geoMarker: new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: "black" }),
          stroke: new Stroke({
            color: "white",
            width: 2,
          }),
        }),
      }),
    };

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature, ...markerList],
      }),
      style: function (feature) {
        const type = feature.get("type") as "route" | "icon" | "geoMarker";
        return styles[type];
      },
    });
    map.addLayer(vectorLayer);

    const extent = route.getExtent();
    map.getView().fit(extent, { padding: [50, 50, 50, 50] });

    if (isRun) {
      vectorLayer.getSource()?.addFeature(geoMarker);
      lastTime = Date.now();
      vectorLayer.on("postrender", moveFeature);
    }
    function moveFeature(event: any) {
      const speed = 20;
      const time = event.frameState.time;
      const elapsedTime = time - lastTime;
      distance = (distance + (speed * elapsedTime) / 1e6) % 1; // 控制距离为 [0, 1] 范围内
      lastTime = time;

      const currentCoordinate = route.getCoordinateAt(distance);
      position?.setCoordinates(currentCoordinate);

      const vectorContext = getVectorContext(event);
      vectorContext.setStyle(styles.geoMarker);
      vectorContext.drawGeometry(position);

      // tell OpenLayers to continue the postrender animation
      map?.render();
    }
  };

  return { addEvent, pending, createLineEvent };
};
