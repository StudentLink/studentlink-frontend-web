import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '404',
};

const Error = () => {
	return <p>404 Not Found.</p>;
};

export default Error;
