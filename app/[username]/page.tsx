'use client';

// ------------------------------------------------------ Next ---------------------------------------------------------
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';

// --------------------------------------------------- Components ------------------------------------------------------
import Loader from '@components/Loader/Loader';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import useData from './hooks/useData';

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import { IonIcon } from '@ionic/react';
import { logOutOutline, settingsOutline } from 'ionicons/icons';
import './styles.scss';
import { useAppDispatch } from '@lib/hooks';
import { setIsLogged } from '@lib/features/auth/authSlice';

const Profile = ({ params }: { params: { username: string } }) => {
	const { username } = params;
	const { user, posts, isSelf, error } = useData(username);
	const router = useRouter();
	const cookies = useCookies();
	const dispatch = useAppDispatch();

	const logOut = () => {
		dispatch(setIsLogged(false));
		cookies.remove('token');
		router.push('/auth/signin');
	};

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
									className='settings rotate'
								>
									<IonIcon icon={settingsOutline} />
								</Link>
								<button
									className='settings'
									onClick={logOut}
								>
									<IonIcon icon={logOutOutline} />
								</button>
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
										<p className='content'>
											{post.content}
										</p>
										<div className='footer'>
											<p className='locations'>
												{post.locations &&
												post.locations.length > 0
													? post.locations?.join(', ')
													: 'France'}
											</p>
											<p className='date'>
												{post.createdAt}
											</p>
										</div>
									</div>
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
