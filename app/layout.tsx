import { Metadata } from 'next';
import '@styles/globals.scss';
import StoreProvider from './StoreProvider';
import Providers from './providers';
import { CookiesProvider } from 'next-client-cookies/server';
import Navbar from '@components/Navbar/Navbar';

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
				<main className='app dark text-foreground bg-background'>
					<StoreProvider>
						<CookiesProvider>
							<Providers>
								<Navbar />
								<div className='pageContainer'>{children}</div>
							</Providers>
						</CookiesProvider>
					</StoreProvider>
				</main>
			</body>
		</html>
	);
};

export default RootLayout;
