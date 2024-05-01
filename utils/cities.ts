import City from '@customTypes/city';
import cities from './cities.json';

export const getCityFromInsee = (insee: number | string) => {
	const city = (cities as City[]).find(y => {
		return y.insee_code == `${insee}`;
	});

	if (city) {
		return `${city.label[0].toUpperCase()}${city.label.slice(1)}`;
	}
	return 'N/A';
};
