import { create } from 'zustand';

interface Store {
	isLoggedIn: boolean;
	token: string | null;
	userId: string | null;
	setIsLoggedIn: (status: boolean) => void;
	setToken: (newToken: string | null) => void;
	setUserId: (id: string | null) => void;
	setUserNull: () => void;
}

const useStore = create<Store>((set) => ({
	isLoggedIn: false,
	token: null,
	userId: null,
	setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
	setToken: (newToken: string | null) => set({ token: newToken }),
	setUserId: (id: string | null) => set({ userId: id }),
	setUserNull: () =>
		set({
			isLoggedIn: false,
			token: null,
			userId: null,
		}),
}));

export { useStore };
