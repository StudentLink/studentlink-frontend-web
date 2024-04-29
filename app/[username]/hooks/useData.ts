import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import User from '@customTypes/user';
import Post from '@customTypes/post';
import { useAppSelector } from '@lib/hooks';
import cities from '@/utils/cities.json';
import City from '@customTypes/city';
import { jwtDecode } from 'jwt-decode';
import { formatDate } from '@utils/date';

const colors = ['2ab2f7', '5da800', 'cc0052', 'ccb200'];

// ---------------------------------------------------- FAKE DATA ------------------------------------------------------
const user: User = {
	id: 68,
	userIdentifier: 'alexisvasseur96@gmail.com',
	email: 'alexisvasseur96@gmail.com',
	roles: ['ROLE_USER'],
	name: 'Alexis VASSEUR',
	username: 'unepicier',
	picture: '',
	locations: [33063],
	school: {
		id: 78,
		name: 'Bordeaux YNOV Campus',
	},
};
const fakePosts: Post[] = [
	{
		id: 1,
		content: `Dolore id incididunt Lorem amet qui ex aliquip cillum cupidatat dolor eu esse cupidatat cillum.
		Nisi esse commodo do incididunt amet Lorem reprehenderit ex excepteur in tempor cillum reprehenderit do elit aliquip in Lorem.
		Nostrud sint sunt culpa excepteur amet esse officia deserunt commodo pariatur.
		Nostrud magna consectetur ut ipsum quis culpa irure duis ullamco dolore cupidatat dolor nulla id officia aliquip dolore incididunt voluptate.
		Sunt enim eiusmod mollit non quis ad.`,
		locations: [33063],
		user: user,
		school: null,
		createdAt: '2024-04-29T13:56:07+00:00',
	},
	{
		id: 2,
		content: `Dolore id incididunt Lorem amet qui ex aliquip cillum cupidatat dolor eu esse cupidatat cillum.
		Nisi esse commodo do incididunt amet Lorem reprehenderit ex excepteur in tempor cillum reprehenderit do elit aliquip in Lorem.
		Nostrud sint sunt culpa excepteur amet esse officia deserunt commodo pariatur.
		Nostrud magna consectetur ut ipsum quis culpa irure duis ullamco dolore cupidatat dolor nulla id officia aliquip dolore incididunt voluptate.
		Sunt enim eiusmod mollit non quis ad.`,
		locations: [],
		user: user,
		school: null,
		createdAt: '2024-04-29T13:56:07+00:00',
	},
	{
		id: 3,
		content: `Dolore id incididunt Lorem amet qui ex aliquip cillum cupidatat dolor eu esse cupidatat cillum.
		Nisi esse commodo do incididunt amet Lorem reprehenderit ex excepteur in tempor cillum reprehenderit do elit aliquip in Lorem.
		Nostrud sint sunt culpa excepteur amet esse officia deserunt commodo pariatur.
		Nostrud magna consectetur ut ipsum quis culpa irure duis ullamco dolore cupidatat dolor nulla id officia aliquip dolore incididunt voluptate.
		Sunt enim eiusmod mollit non quis ad.`,
		locations: [],
		user: user,
		school: null,
		createdAt: '2024-04-29T13:56:07+00:00',
	},
];
// ---------------------------------------------------------------------------------------------------------------------

const useData = (username: string) => {
	const cookies = useCookies();

	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [posts, setPosts] = useState<Post[]>([]);
	const [isSelf, setIsSelf] = useState<boolean>(false);

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
						jwtDecode(cookies.get('token') || '').sub == response.id
					) {
						setIsSelf(true);
					}

					const updatedPosts = fakePosts.map(post =>
						formatPost(post)
					);

					setPosts(updatedPosts);

					// fetchPosts(setPosts);
				} catch (error) {
					console.error(error);
					setError(
						'Une erreur est survenue. Réessaie dans quelques secondes.'
					);
				}
			})();
		}
	}, []);

	return {
		user,
		posts,
		error,
		isSelf,
	};
};

export default useData;

const getRandomArbitrary = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
};

const fetchPosts = async (setPosts: Dispatch<SetStateAction<Post[]>>) => {
	const username = useAppSelector(state => state.auth.username);

	try {
		const response = await fetch(
			`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${username}/posts`
		);

		if (response.ok) {
			const data: Post[] = await response.json();

			setPosts(data);
		}
	} catch (error) {
		console.error(error);
	}
};

const formatPost = (post: Post) => {
	let result = post;

	if (post.locations && post.locations.length > 0) {
		result.locations = post.locations.map(x => {
			const city = (cities as City[]).find(y => {
				return y.insee_code == `${x}`;
			});
			if (city)
				return `${city.label[0].toUpperCase()}${city.label.slice(1)}`;
			return 'N/A';
		});
	}

	result.createdAt = formatDate(post.createdAt);

	return result;
};
