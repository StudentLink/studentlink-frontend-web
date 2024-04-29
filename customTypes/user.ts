import School from './school';

type User = {
	id: number;
	userIdentifier: string;
	username: string;
	name: string;
	email: string;
	password?: string;
	picture: string;
	school: School;
	roles: string[];
	locations: number[];
};

export default User;
