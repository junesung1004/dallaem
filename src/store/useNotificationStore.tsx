import { create } from 'zustand';

interface NotificationState {
	notifications: Record<string, { hasNotification: boolean; count: number }>;
	updateNotification: (
		key: string,
		hasNotification: boolean,
		count?: number,
	) => void;
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
}));

export default useNotificationStore;
