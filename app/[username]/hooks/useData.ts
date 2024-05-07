// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- React & Next -----------------------------------------------------
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';

// ------------------------------------------------------ Utils --------------------------------------------------------
import { jwtDecode } from 'jwt-decode';
import { formatDate } from '@utils/date';
import { getCityFromInsee } from '@utils/cities';
import User from '@customTypes/user';
import Post from '@customTypes/post';

const colors = ['2ab2f7', '5da800', 'cc0052', 'ccb200'];

const useData = (username: string) => {
	const cookies = useCookies();

	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [posts, setPosts] = useState<Post[]>([]);
	const [isSelf, setIsSelf] = useState<boolean>(false);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	useEffect(() => {
		fetchPosts(setPosts, username, cookies.get('token') ?? '');
	}, []);

	useEffect(() => {
		if (!user && posts.length == 0) {
			(async () => {
				try {
					const request = await fetch(
						`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${username}`,
						{
							headers: {
								Authorization: `Bearer ${cookies.get('token')}`,
							},
						}
					);

					if (!request.ok) {
						setError(
							'Une erreur est survenue. Réessaie dans quelques secondes.'
						);
						return;
					}

					const response = await request.json();

					const pictureRequest = await fetch(
						`https://ui-avatars.com/api/?format=png&size=512&rounded=true&color=0c1920&background=${colors[getRandomArbitrary(0, colors.length)]}&name=${response.name.replaceAll(/[ -'_]+/g, '+')}`
					);
					const picture = URL.createObjectURL(
						await pictureRequest.blob()
					);

					setUser(() => ({
						...response,
						picture: picture,
					}));

					if (
						(
							(jwtDecode(cookies.get('token') || '') as any)
								.roles as string[]
						).includes('ROLE_ADMIN')
					) {
						setIsAdmin(true);
					}

					if (
						jwtDecode(cookies.get('token') || '').sub == response.id
					) {
						setIsSelf(true);
					}
				} catch (error) {
					console.error(error);
					setError(
						'Une erreur est survenue. Réessaie dans quelques secondes.'
					);
				}
			})();
		}
	}, [cookies, posts.length, user, username]);

	return {
		user,
		posts,
		error,
		isSelf,
		isAdmin,
	};
};

export default useData;

const getRandomArbitrary = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
};

const fetchPosts = async (
	setPosts: Dispatch<SetStateAction<Post[]>>,
	username: string,
	token: string
) => {
	try {
		const response = await fetch(
			`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${username}/posts`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.ok) {
			const data: Post[] = await response.json();

			const updatedPosts = data.map(post => formatPost(post));

			setPosts(updatedPosts);
		}
	} catch (error) {
		console.error(error);
	}
};

const formatPost = (post: Post) => {
	const result = post;

	if (post.location) {
		result.location = getCityFromInsee(post.location);
	}

	result.createdAt = formatDate(post.createdAt);

	return result;
};
