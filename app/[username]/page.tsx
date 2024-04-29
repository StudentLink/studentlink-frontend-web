'use client';

// ------------------------------------------------------ Next ---------------------------------------------------------
import Image from 'next/image';

// --------------------------------------------------- Components ------------------------------------------------------
import Loader from '@components/Loader/Loader';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import useData from './hooks/useData';

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import './styles.scss';
import Link from 'next/link';
import { IonIcon } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

const Profile = ({ params }: { params: { username: string } }) => {
	const { username } = params;
	const { user, posts, isSelf, error } = useData(username);

	if (!user) {
		return (
			<div className='loaderContainer'>
				<Loader />
			</div>
		);
	}

	if (error) {
		return <p className='error'>{error}</p>;
	}

	return (
		<div className='container'>
			<div className='header'>
				<div className='infos'>
					<Image
						src={user.picture}
						alt='profilePic'
						className='picture'
						width={128}
						height={128}
						priority
					/>
					<div className='col'>
						<p className='name'>{user.name}</p>
						<p className='username'>@{user.username}</p>
						<Link
							href={`/school`}
							className='school'
						>
							{user.school.name}
						</Link>
					</div>
				</div>

				{isSelf && (
					<div className='settingsContainer'>
						<Link
							href='/settings'
							className='settings'
						>
							<IonIcon icon={settingsOutline} />
						</Link>
					</div>
				)}
			</div>

			<div className='postsContainer'>
				<p className='postsTitle'>Posts</p>
				<div className='posts'>
					{posts.length > 0 ? (
						posts.map(post => (
							<div
								className='post'
								key={post.id}
							>
								<p className='content'>{post.content}</p>
								<div className='footer'>
									<p className='locations'>
										{post.locations &&
										post.locations.length > 0
											? post.locations?.join(', ')
											: 'France'}
									</p>
									<p className='date'>{post.createdAt}</p>
								</div>
							</div>
						))
					) : (
						<p className='noPosts'>Aucun post pour le moment.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
