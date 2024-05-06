'use client';

import FeedSwitch from '@components/FeedSwitch/FeedSwitch';
import './styles.scss';
import { useAppSelector } from '@lib/hooks';
import Post from '@components/Post/Post';

const Feed = () => {
	const posts = useAppSelector(state => state.feed.posts);

	console.log(posts);

	return (
		<div className='feed'>
			<FeedSwitch />

			<div className='postsContainer'>
				{posts.map(post => (
					<Post
						post={post}
						previewComments
					/>
				))}
			</div>
		</div>
	);
};

export default Feed;
