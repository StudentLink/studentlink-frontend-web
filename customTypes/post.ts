import User from './user';
import School from './school';
import Comment from './Comment';

type Post = {
	id: number;
	content: string;
	school: School | null;
	location: string | number | null;
	user: User;
	createdAt: string;
	comments: Comment[];
};

export default Post;
