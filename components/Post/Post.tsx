// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Next ---------------------------------------------------------
import Link from 'next/link';
import Image from 'next/image';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import useData from './hooks/useData';

// ------------------------------------------------------ Utils --------------------------------------------------------
import { getCityFromInsee } from '@utils/cities';
import PostType from '@customTypes/post';
import { formatDate } from '@utils/date';

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import './styles.scss';
import { IonIcon } from '@ionic/react';
import { chatbubbleOutline } from 'ionicons/icons';

const Post = ({
	post,
	previewComments,
}: {
	post: PostType;
	previewComments?: true;
}) => {
	const { formattedComments, profileImage } = useData(
		post,
		previewComments ?? false
	);

	return (
		profileImage && (
			<div className='postContainer'>
				<div className='post'>
					<div className='postHeader'>
						<Image
							src={profileImage ?? ''}
							alt='picture'
							width={200}
							height={200}
							className='profilePicture'
						/>
						<div className='postHeaderInfos'>
							<Link
								href={`/${post.user.username}`}
								className='username'
							>
								{post.user.name}
								<span className='userAt'>
									@{post.user.username}
								</span>
							</Link>
							<p>
								{post.location
									? getCityFromInsee(post.location)
									: post.school?.name}
							</p>
						</div>
					</div>
					<div className='postSeparator' />
					<div className='postContent'>{post.content}</div>
					<div className='postFooter'>
						<Link
							href={`/post/${post.id}`}
							className='comments'
						>
							<IonIcon icon={chatbubbleOutline} />
							{post.comments.length}
						</Link>
						<p className='postDate'>{formatDate(post.createdAt)}</p>
					</div>
				</div>
				{formattedComments.length > 0 && (
					<div className='postComments'>
						{formattedComments.map(comment => (
							<div
								key={`post#${post.id}:comment#${comment.id}`}
								className='post'
							>
								<div className='postHeader'>
									<Image
										src={comment.user.picture ?? ''}
										alt='picture'
										width={200}
										height={200}
										className='profilePicture'
									/>
									<div className='postHeaderInfos'>
										<Link
											href={`/${comment.user.username}`}
											className='username'
										>
											{comment.user.name}
											<span className='userAt'>
												@{comment.user.username}
											</span>
										</Link>
									</div>
								</div>
								<p className='commentContent'>
									{comment.content}
								</p>
								<div className='postFooter'>
									<p className='postDate'>
										{formatDate(comment.createdAt)}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		)
	);
};

export default Post;
