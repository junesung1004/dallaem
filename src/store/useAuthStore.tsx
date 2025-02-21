import { Store } from '@/types/userType';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create<Store & { hasHydrated: boolean }>()(
	persist(
		(set) => ({
			isLoggedIn: false,
			token: null,
			userId: null,
			email: null,
			name: null,
			companyName: null,
			image: null,
			hasHydrated: false, // hydration 상태 추가
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
					hasHydrated: false,
				}),
		}),
		{
			name: 'user-storage', // 로컬 스토리지에 저장될 키 이름
			storage: createJSONStorage(() => localStorage), // localStorage 사용
			onRehydrateStorage: () => (state) => {
				if (state) state.hasHydrated = true; // hydration 완료 시 상태 업데이트
			},
		},
	),
);

export { useAuthStore };
