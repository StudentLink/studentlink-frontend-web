import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@lib/hooks';

export type City = {
	insee_code: string;
	city_code: string;
	zip_code: string;
	label: string;
	latitude: string;
	longitude: string;
	department_name: string;
	department_number: string;
	region_name: string;
	region_geojson_name: string;
};

const useData = () => {
	const router = useRouter();

	const [error, setError] = useState<string | null>(null);
	const [localisations, setLocalisations] = useState<number[]>([]);
	const [school, setSchool] = useState<number>();
	const [dpts, setDpts] = useState<City[]>([]);

	const auth = useAppSelector(state => state.auth);

	useEffect(() => {
		if (auth.isLogged) {
			router.push('/');
			return;
		}

		if (auth.displayname == '' && auth.username == '' && auth.email == '') {
			router.push('/auth/signup/steps/1');
			return;
		}
	}, []);

	return {
		error,
		setError,
		localisations,
		setLocalisations,
		school,
		setSchool,
		dpts,
		setDpts,
		schools: [
			{
				id: 1,
				name: 'Bordeaux Ynov Campus',
				address: '2 Esplanade de la Gare, 33110 Le Bouscat',
			},
		].map(x => ({ label: x.name, value: x.id })),
	};
};

export default useData;
