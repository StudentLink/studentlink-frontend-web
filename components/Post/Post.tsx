// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- React & Next -----------------------------------------------------
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCookies } from 'next-client-cookies';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import useData from './hooks/useData';

// ------------------------------------------------------ Utils --------------------------------------------------------
import { getCityFromInsee } from '@utils/cities';
import PostType from '@customTypes/post';
import { formatDate } from '@utils/date';

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import './styles.scss';
import { IonIcon } from '@ionic/react';
import { chatbubbleOutline, sendOutline, trashOutline } from 'ionicons/icons';

const Post = ({
	post,
	previewComments,
	canComment,
}: {
	post: PostType;
	previewComments?: true;
	canComment?: true;
}) => {
	const commentInputRef = useRef<HTMLSpanElement>(null);
	const cookies = useCookies();

	const { formattedComments, profileImage, isSelf } = useData(
		post,
		previewComments ?? false,
		cookies.get('token')
	);

	const postComment = async () => {
		if (!commentInputRef.current) {
			return;
		}

		if (
			!commentInputRef.current.textContent ||
			commentInputRef.current.textContent.length == 0
		) {
			return;
		}

		try {
			await fetch(
				'https://studentlink.etudiants.ynov-bordeaux.com/api/comments',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${cookies.get('token')}`,
					},
					body: JSON.stringify({
						content: commentInputRef.current.textContent,
						post: post.id,
					}),
				}
			);

			location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	const deletePost = async () => {
		if (!confirm('Es-tu sûr de vouloir supprimer ce post ?')) return;

		try {
			await fetch(
				`https://studentlink.etudiants.ynov-bordeaux.com/api/posts/${post.id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${cookies.get('token')}`,
					},
				}
			);

			location.reload();
		} catch (error) {
			console.error(error);
		}
	};
	const deleteComment = async (id: number) => {
		if (!confirm('Es-tu sûr de vouloir supprimer ce commentaire ?')) return;

		try {
			await fetch(
				`https://studentlink.etudiants.ynov-bordeaux.com/api/comments/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${cookies.get('token')}`,
					},
				}
			);

			location.reload();
		} catch (error) {
			console.error(error);
		}
	};

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
						{isSelf && (
							<button
								className='deleteButton'
								onClick={deletePost}
							>
								<IonIcon icon={trashOutline} />
							</button>
						)}
					</div>
					<div className='postSeparator' />
					<div className='postContent'>{post.content}</div>
					<div className='postFooter'>
						{previewComments ? (
							<Link
								href={`/post/${post.id}`}
								className='comments'
							>
								<IonIcon icon={chatbubbleOutline} />
								{post.comments.length}
							</Link>
						) : (
							<div className='comments'>
								<IonIcon icon={chatbubbleOutline} />
								{post.comments.length}
							</div>
						)}
						<p className='postDate'>{formatDate(post.createdAt)}</p>
					</div>
				</div>

				{(formattedComments.length > 0 || canComment) && (
					<div className='postComments'>
						{canComment && (
							<div className='sendCommentContainer'>
								<span
									ref={commentInputRef}
									className='commentInput'
									contentEditable
								></span>
								<button
									className='sendComment'
									onClick={postComment}
								>
									<IonIcon icon={sendOutline} />
								</button>
							</div>
						)}
						{formattedComments.length > 0 &&
							formattedComments.map(comment => (
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
										<button
											className='deleteButton'
											onClick={() =>
												deleteComment(comment.id)
											}
										>
											<IonIcon icon={trashOutline} />
										</button>
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
