import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import { City } from './useData';
import cities from '@utils/cities.json';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '@lib/hooks';
import { setIsLogged } from '@lib/features/auth/authSlice';

const useActions = (
	setError: Dispatch<SetStateAction<string | null>>,
	setDpts: Dispatch<SetStateAction<City[]>>,
	localisations: number[],
	school: number | undefined
) => {
	const router = useRouter();
	const cookies = useCookies();
	const dispatch = useAppDispatch();

	const searchCities = (value: string) => {
		if (value.length < 2) {
			setDpts([]);
			return;
		}

		setDpts(
			(cities as City[]).filter(city => city.zip_code.startsWith(value))
		);
	};

	const signUp = async () => {
		if (localisations.length < 0) {
			setError('Il manque une ville minimum');
			return;
		}

		if (!school) {
			setError('Il manque ton école');
			return;
		}

		try {
			const request = await fetch(
				'https://studentlink.etudiants.ynov-bordeaux.com/api/users/me',
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${cookies.get('token')}`,
					},
					body: JSON.stringify({
						localisations: localisations,
						school: school,
					}),
				}
			);

			const response = await request.json();

			if (!request.ok) {
				setError(response.message);
				return;
			}

			const token = response.token;

			if (!token) {
				setError(
					"Une erreur s'est produite. Réessaie dans quelques secondes."
				);
				return;
			}

			const expires = jwtDecode(response.token).exp;

			cookies.set('token', response.token, {
				path: '/',
				expires: expires ? new Date(expires * 1000) : 0,
			});
		} catch (error) {
			console.error(error);
			return;
		}

		dispatch(setIsLogged(true));

		router.push('/');
	};

	return {
		signUp,
		searchCities,
	};
};

export default useActions;
