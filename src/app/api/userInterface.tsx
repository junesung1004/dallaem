interface signinUserInterface {
	email: string;
	password: string;
}

interface signupUserInterface {
	email: string;
	password: string;
	name: string;
	companyName: string;
}

export type { signinUserInterface, signupUserInterface };
