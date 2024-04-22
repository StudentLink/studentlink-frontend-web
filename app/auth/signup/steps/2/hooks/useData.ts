import { useState } from 'react';

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
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [localisations, setLocalisations] = useState<number[]>([]);
	const [school, setSchool] = useState<number>();
	const [dpts, setDpts] = useState<City[]>([]);

	return {
		error,
		setError,
		isLoading,
		setIsLoading,
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
