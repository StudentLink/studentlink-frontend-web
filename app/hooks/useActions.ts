import { Dispatch, RefObject, SetStateAction } from 'react';
import { Cookies } from 'next-client-cookies';
import City from '@customTypes/city';
import cities from '@utils/cities.json';

const useActions = (
	setDpts: Dispatch<SetStateAction<City[]>>,
	postRef: RefObject<HTMLTextAreaElement>,
	cookies: Cookies,
	location: string | null
) => {
	const searchCities = (value: string) => {
		if (value.length < 2) {
			setDpts([]);
			return;
		}

		setDpts(
			(cities as City[]).filter(city => city.zip_code.startsWith(value))
		);
	};

	const sendPost = async () => {
		if (!postRef.current || !location) {
			return;
		}

		try {
			const createRequest = await fetch(
				'https://studentlink.etudiants.ynov-bordeaux.com/api/posts',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${cookies.get('token')}`,
					},
					body: JSON.stringify({
						content: postRef.current.textContent,
						location: location,
					}),
				}
			);

			const createResponse = await createRequest.json();

			console.log(createResponse);
		} catch (error) {
			console.error(error);
		}
	};

	return { sendPost, searchCities };
};

export default useActions;
