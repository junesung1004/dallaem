import { create } from "zustand";
import { Count } from "../types/countType";

export const useCount = create<Count>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));
