export interface IUser {
	teamId: number;
	id: number;
	email: string;
	name: string;
	companyName: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}

export interface Store {
	isLoggedIn: boolean;
	token: string | null;
	userId: number | null;
	email: string | null;
	name: string | null;
	companyName: string | null;
	image: string | null;
	setIsLoggedIn: (status: boolean) => void;
	setToken: (newToken: string | null) => void;
	setUserId: (id: number | null) => void;
	setEmail: (email: string | null) => void;
	setName: (name: string | null) => void;
	setCompanyName: (companyName: string | null) => void;
	setImage: (image: string | null) => void;
	setUserNull: () => void;
}
