import { useRouteplanModal } from "@/store/use-route-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
export const useAddEvent = () => {
  const { routeplanId } = useRouteplanModal();
  const { mutate, pending } = useApiMutation(api.routeplan.addSubRoute);

  const addEvent = (data: any) => {
    mutate({
      routeplanId: routeplanId,
      name: data[0].name,
      point: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
      order: Math.random(),
    })
      .then(() => {
        toast.info("Gig created successfully");
      })
      .catch(() => {
        toast.error("Failed to create gig");
      });
  };
  const createLineEvent = (item: {
    routeName?: string;
    _id: any;
    isEdit?: boolean;
    isSelected?: boolean;
    routerColor?: string;
    routerGroup?: { name: string; point: {}; order: number }[];
  }) => {
    console.log(item, "createLine");
  };
  return { addEvent, pending, createLineEvent };
};
