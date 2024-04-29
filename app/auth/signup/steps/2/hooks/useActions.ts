import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import { City } from './useData';
import cities from '@utils/cities.json';
import { useAppDispatch, useAppSelector } from '@lib/hooks';
import { setAuth, setIsLogged } from '@lib/features/auth/authSlice';

const useActions = (
	setError: Dispatch<SetStateAction<string | null>>,
	setDpts: Dispatch<SetStateAction<City[]>>,
	locations: number[],
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

	const username = useAppSelector(state => state.auth.username);

	const signUp = async () => {
		if (locations.length < 0) {
			setError('Il manque une ville minimum');
			return;
		}

		if (!school) {
			setError('Il manque ton école');
			return;
		}

		try {
			const request = await fetch(
				`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${username}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${cookies.get('token')}`,
					},
					body: JSON.stringify({
						locations: locations,
						school: school,
					}),
				}
			);

			const response = await request.json();

			if (!request.ok) {
				setError(response.message);
				return;
			}

			dispatch(
				setAuth({
					locations: response.locations,
					school: response.school,
				})
			);
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
