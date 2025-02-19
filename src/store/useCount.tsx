import { create } from 'zustand';
import { Count } from '../types/countType';

// zustand 관련 코드드

export const useCount = create<Count>((set) => ({
	count: 0,
	increase: () => set((state) => ({ count: state.count + 1 })),
	decrease: () => set((state) => ({ count: state.count - 1 })),
}));
