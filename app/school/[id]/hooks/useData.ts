// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- React & Next -----------------------------------------------------
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';

// ------------------------------------------------------ Utils --------------------------------------------------------
import { formatDate } from '@utils/date';
import { getCityFromInsee } from '@utils/cities';
import Post from '@customTypes/post';
import School from '@customTypes/school';

const colors = ['2ab2f7', '5da800', 'cc0052', 'ccb200'];

const useData = (id: string) => {
	const cookies = useCookies();

	const [user, setUser] = useState<School | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		fetchPosts(setPosts, id, cookies.get('token') ?? '');
	}, []);

	useEffect(() => {
		if (!user && posts.length == 0) {
			(async () => {
				try {
					const request = await fetch(
						`https://studentlink.etudiants.ynov-bordeaux.com/api/schools/${id}`,
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

					const response: School = await request.json();

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
				} catch (error) {
					console.error(error);
					setError(
						'Une erreur est survenue. Réessaie dans quelques secondes.'
					);
				}
			})();
		}
	}, [cookies, posts.length, user]);

	return {
		user,
		posts,
		error,
	};
};

export default useData;

const getRandomArbitrary = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
};

const fetchPosts = async (
	setPosts: Dispatch<SetStateAction<Post[]>>,
	id: string,
	token: string
) => {
	try {
		const response = await fetch(
			`https://studentlink.etudiants.ynov-bordeaux.com/api/schools/${id}/posts`,
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
