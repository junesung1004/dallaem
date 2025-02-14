export const getGuestId = (): number => {
	let guestId = localStorage.getItem('guestId');

	if (!guestId) {
		guestId = Math.floor(Math.random() * 9000000000 + 1000000000).toString();
		localStorage.setItem('guestId', guestId);
	}
	return Number(guestId);
};
