import { create } from 'zustand';

interface NotificationState {
	notifications: Record<string, { hasNotification: boolean; count: number }>;
	updateNotification: (
		key: string,
		hasNotification: boolean,
		count?: number,
	) => void;
	resetNotifications: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
	notifications: {
		'favorite-meetings': { hasNotification: false, count: 0 },
	},

	updateNotification: (key, hasNotification, count = 0) => {
		// console.log('updateNotification 실행: ', count);
		set((state) => ({
			notifications: {
				...state.notifications,
				[key]: { hasNotification, count },
			},
		}));
	},
	resetNotifications: () => {
		set((state) => {
			const resetState = Object.keys(state.notifications).reduce(
				(acc, key) => {
					acc[key] = { hasNotification: false, count: 0 };
					return acc;
				},
				{} as Record<string, { hasNotification: boolean; count: number }>,
			);
			return { notifications: resetState };
		});
	},
}));

export default useNotificationStore;
