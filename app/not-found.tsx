import { Metadata } from 'next';
import './not-found.scss';
import Button from '@components/Button/Button';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Not Found - StudentLink',
};

const Error = () => {
	return (
		<div className='notFound'>
			<h1 className='title'>404</h1>
			<p className='label'>Il semblerait que tu te sois perdu !</p>

			<Button color='pink'>
				<Link href={'/'}>Retourner en lieu sûr</Link>
			</Button>
		</div>
	);
};

export default Error;
