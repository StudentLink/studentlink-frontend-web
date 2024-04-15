import '@styles/globals.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
	// metadataBase: new URL('')
	title: 'StudentLink',
	description: 'StudentLink app',
	// assets: ['htt'],
	// icons: {
	// 	icon: [
	// 		{ url: '/icon.png' },
	// 		new URL('/icon.png', '<baseUrl>')
	// 	],
	// 	shortcut: ['/icon.png'],
	// 	apple: [{ url: '/icon.png' }],
	// 	other: [
	// 		{
	// 			rel: 'apple-touch-icon-precomposed',
	// 			url: '/icon.png',
	// 		},
	// 	],
	// }
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='fr'>
			<body>
				<main className='app'>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
