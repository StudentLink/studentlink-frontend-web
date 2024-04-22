import { useEffect, useState } from 'react';

interface Department {
	nom: string;
	code: string;
	codeRegion: string;
	_score: number;
}

const useData = () => {
	const [dpts, setDpts] = useState<{ label: string; value: number }[]>([]);

	// Fetch departments
	useEffect(() => {
		(async () => {
			try {
				const dptsResponse = await fetch(
					'https://geo.api.gouv.fr/departements'
				);

				const dptsData: Department[] = await dptsResponse.json();

				const formattedDpts = dptsData
					.map((dpt: Department) => ({
						label: `${dpt.codeRegion} ${dpt.nom}`,
						value: parseInt(dpt.code),
					}))
					.sort((a, b) => a.value - b.value);

				setDpts(formattedDpts);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return {
		dpts: dpts,
		schools: [
			{
				id: 1,
				name: 'Bordeaux Ynov Campus',
				address: '2 Esplanade de la Gare, 33110 Le Bouscat',
			},
		],
	};
};

export default useData;
