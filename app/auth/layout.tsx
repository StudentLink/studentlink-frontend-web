import { Metadata } from 'next';
import Image from 'next/image';
import icon from '@public/assets/logo.png';
import './authLayout.scss';
import Providers from './providers';

export const metadata: Metadata = {
	title: 'Auth - StudentLink',
	description: 'StudentLink app',
	robots: 'noindex, nofollow',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Image
				src={icon}
				alt='logo'
				width={600}
				height={200}
				className='appLogo'
				priority
			/>
			<Providers>{children}</Providers>
		</>
	);
};

export default AuthLayout;
