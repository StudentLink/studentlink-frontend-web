'use client';

// ------------------------------------------------------ Next ---------------------------------------------------------
import Image from 'next/image';
import Link from 'next/link';

// --------------------------------------------------- Components ------------------------------------------------------
import Loader from '@components/Loader/Loader';
import Post from '@components/Post/Post';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import useData from './hooks/useData';

// ------------------------------------------------------ Utils --------------------------------------------------------
import { getCityFromInsee } from '@utils/cities';

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import './styles.scss';

const Profile = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const { user, posts, error } = useData(id);

	return (
		<div className='profilePage'>
			{!user ? (
				<div className='loaderContainer'>
					<Loader />
				</div>
			) : error ? (
				<p className='loadingError'>{error}</p>
			) : (
				<div className='container'>
					<div className='header'>
						<div className='infos'>
							<Image
								src={(user as any).picture}
								alt='profilePic'
								className='picture'
								width={128}
								height={128}
								priority
							/>
							<div className='col'>
								<p className='name'>{user.name}</p>
							</div>
						</div>
					</div>

					<div className='postsContainer'>
						<p className='postsTitle'>Posts</p>
						<div className='posts'>
							{posts.length > 0 ? (
								posts.map(post => (
									<Post
										key={`post#${post.id}`}
										post={post}
										previewComments
									/>
								))
							) : (
								<p className='noPosts'>
									Aucun post pour le moment.
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
