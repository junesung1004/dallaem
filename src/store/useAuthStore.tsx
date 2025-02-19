import { create } from 'zustand';

interface Store {
	isLoggedIn: boolean;
	token: string | null;
	userId: number | null;
	setIsLoggedIn: (status: boolean) => void;
	setToken: (newToken: string | null) => void;
	setUserId: (id: number | null) => void;
	setUserNull: () => void;
}

const useStore = create<Store>((set) => ({
	isLoggedIn: false,
	token: null,
	userId: null,
	setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
	setToken: (newToken: string | null) => set({ token: newToken }),
	setUserId: (id: number | null) => set({ userId: id }),
	setUserNull: () =>
		set({
			isLoggedIn: false,
			token: null,
			userId: null,
		}),
}));

export { useStore };
