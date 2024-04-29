import User from './user';
import School from './school';

type Post = {
	id: number;
	content: string;
	school: School | null;
	locations: number[] | string[] | null;
	user: User;
	createdAt: string;
};

export default Post;
