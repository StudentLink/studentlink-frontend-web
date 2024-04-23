'use client';

import useData from './hooks/useData';
import './styles.scss';

const Feed = () => {
	const { posts, loadPosts } = useData();

	return (
		<div>
			<h1>Hello World</h1>
		</div>
	);
};

export default Feed;
