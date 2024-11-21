import { create } from "zustand";
type State = {
  collectId: string;
};
type Action = {
  updateCollectId: (newcollectId: any) => void;
};
export const useCollectModal = create<State & Action>((set) => ({
  collectId: "",
  updateCollectId: (newcollectId: any) => set({ collectId: newcollectId }),
}));
