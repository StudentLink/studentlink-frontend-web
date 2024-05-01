import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@lib/hooks';
import School from '@customTypes/school';

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
	const [locations, setLocations] = useState<number[]>([]);
	const [school, setSchool] = useState<number>();
	const [dpts, setDpts] = useState<City[]>([]);

	const auth = useAppSelector(state => state.auth);

	const [schools, setSchools] = useState<School[]>([]);

	useEffect(() => {
		if (auth.isLogged) {
			router.push('/');
			return;
		}

		if (auth.name == '' && auth.username == '' && auth.email == '') {
			router.push('/auth/signup/steps/1');
			return;
		}

		(async () => {
			try {
				const request = await fetch(
					'https://studentlink.etudiants.ynov-bordeaux.com/api/schools'
				);

				const schools = await request.json();

				setSchools(schools);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [auth.name, auth.email, auth.isLogged, auth.username, router]);

	return {
		error,
		setError,
		locations,
		setLocations,
		school,
		setSchool,
		dpts,
		setDpts,
		schools: schools.map(x => ({ label: x.name, value: x.id })),
	};
};

export default useData;
