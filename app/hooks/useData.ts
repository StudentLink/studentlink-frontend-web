import { useState } from 'react';

const useData = () => {
	const [posts, setPosts] = useState([]);

	const loadPosts = () => {};

	return {
		posts,
		loadPosts,
	};
};

export default useData;
