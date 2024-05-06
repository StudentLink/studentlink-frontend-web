import { Dispatch, RefObject, SetStateAction } from 'react';
import { Cookies } from 'next-client-cookies';
import City from '@customTypes/city';
import cities from '@utils/cities.json';

const useActions = (
	postRef: RefObject<HTMLTextAreaElement>,
	cookies: Cookies,
	setSelectData: Dispatch<SetStateAction<any[]>>,
	selectValue: string | null,
	feedType: 'global' | 'school' | 'locations'
) => {
	const searchCities = (value: string) => {
		if (value.length < 2) {
			setSelectData([]);
			return;
		}

		setSelectData(
			(cities as City[])
				.filter(city => city.zip_code.startsWith(value))
				.map(x => ({
					label: `${x.zip_code} - ${x.label
						.split(' ')
						.map(y => `${y[0].toUpperCase()}${y.slice(1)}`)
						.join(' ')}`,
					value: parseInt(x.insee_code),
				}))
		);
	};

	const sendPost = async () => {
		if (!postRef.current || !selectValue) {
			return;
		}

		try {
			await fetch(
				'https://studentlink.etudiants.ynov-bordeaux.com/api/posts',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${cookies.get('token')}`,
					},
					body: JSON.stringify({
						content: postRef.current.textContent,
						[feedType == 'global' ? 'location' : feedType]:
							selectValue,
					}),
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	return { sendPost, searchCities };
};

export default useActions;
