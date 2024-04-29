export const formatDate = (input: string | Date): string => {
	const date = new Date(input);

	const day = `${date.getDate()}`;
	const month = `${date.getMonth()}`;
	const year = `${date.getFullYear()}`;

	return `${day.length == 1 ? `0${day}` : day}/${month.length == 1 ? `0${month}` : month}/${year}`;
};
