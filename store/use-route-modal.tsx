import { create } from "zustand";
type State = {
  routeplanId: string;
};
type Action = {
  updateRouteplanId: (newrouteplanId: any) => void;
};
export const useRouteplanModal = create<State & Action>((set) => ({
  routeplanId: "",
  updateRouteplanId: (newrouteplanId: any) => set({ routeplanId: newrouteplanId }),
}));
