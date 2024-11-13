import { useRouteplanModal } from "@/store/use-route-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Feature, Map } from "ol";
import VectorSource from "ol/source/Vector";
import { LineString } from "ol/geom";
import { Stroke, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
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
    map: Map | null
  ) => {
    if (!item.routerGroup || !map) return;
    const coordinates = item.routerGroup?.map((point: { point: any }) => point.point);
    if (!coordinates) return;
    console.log("Coordinates in createLineEvent:", coordinates);
    const route = new LineString(coordinates);
    const routeFeature = new Feature({
      type: "route",
      geometry: route,
    });
    routeFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: item.routerColor || "blue",
          width: 4,
        }),
      })
    );

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature],
      }),
    });
    map.addLayer(vectorLayer);
    console.log(vectorLayer?.getSource()?.getFeatures());
    const extent = route.getExtent();
    map.getView().fit(extent, { padding: [50, 50, 50, 50] });
  };
  return { addEvent, pending, createLineEvent };
};
