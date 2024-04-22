import { Dispatch, SetStateAction } from 'react';
import cities from '@utils/cities.json';
import { City } from './useData';

const useActions = (
	setError: Dispatch<SetStateAction<string | null>>,
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	setDpts: Dispatch<SetStateAction<City[]>>,
	localisations: number[],
	school: number | undefined
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

	const signUp = async () => {
		if (localisations.length < 0) {
			setError('');
			return;
		}

		if (!school) {
			setError('');
			return;
		}

		setIsLoading(true);

		const req = await fetch('', {
			method: 'POST',
			headers: {
				'Content-Type': 'appplication/json',
			},
			body: JSON.stringify({}),
		});

		const res = await req.json();

		console.log(res);

		setIsLoading(false);
	};

	return {
		signUp,
		searchCities,
	};
};

export default useActions;
