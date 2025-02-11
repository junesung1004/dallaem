interface signinUserInterface {
	email: string;
	password: string;
	onError?: (errorMessage: string) => void;
}

interface signupUserInterface {
	email: string;
	password: string;
	name: string;
	companyName: string;
	onError?: (errorMessage: string) => void;
}

export type { signinUserInterface, signupUserInterface };
