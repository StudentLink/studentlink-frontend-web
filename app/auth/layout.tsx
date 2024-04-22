import { Metadata } from 'next';
import Image from 'next/image';
import icon from '@public/assets/logo.png';
import './authLayout.scss';

export const metadata: Metadata = {
	title: 'Auth - StudentLink',
	description: 'StudentLink app',
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
			{children}
		</>
	);
};

export default AuthLayout;
