import { Store } from '@/types/userType';
import { create } from 'zustand';

const useStore = create<Store>((set) => ({
	isLoggedIn: false,
	token: null,
	userId: null,
	email: null,
	name: null,
	companyName: null,
	image: null,
	setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
	setToken: (newToken: string | null) => set({ token: newToken }),
	setUserId: (id: number | null) => set({ userId: id }),
	setEmail: (email: string | null) => set({ email: email }),
	setName: (name: string | null) => set({ name: name }),
	setCompanyName: (companyName: string | null) =>
		set({ companyName: companyName }),
	setImage: (image: string | null) => set({ image: image }),
	setUserNull: () =>
		set({
			isLoggedIn: false,
			token: null,
			userId: null,
			email: null,
			name: null,
			companyName: null,
			image: null,
		}),
}));

export { useStore };
