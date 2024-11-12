import { create } from "zustand";
import { Map } from "ol";
type State = {
  map: Map | null;
};
type Action = {
  updateMap: (newMap: any) => void;
};
export const useMapModal = create<State & Action>((set) => ({
  map: null,
  updateMap: (newMap: any) => set({ map: newMap }),
}));
