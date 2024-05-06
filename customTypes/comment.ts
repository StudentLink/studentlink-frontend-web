import User from './user';

type Comment = {
	id: number;
	content: string;
	user: User;
	createdAt: string;
};

export default Comment;
