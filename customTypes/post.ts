import User from './user';
import School from './school';

type Post = {
	id: number;
	content: string;
	school: School | null;
	location: string | number | null;
	user: User;
	createdAt: string;
};

export default Post;
