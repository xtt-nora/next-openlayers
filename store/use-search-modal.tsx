import { create } from "zustand";
type State = {
  search: string;
};
type Action = {
  updateSearch: (newSearch: any) => void;
};
export const useSearchModal = create<State & Action>((set) => ({
  search: "",
  updateSearch: (newSearch: any) => set({ search: newSearch }),
}));
