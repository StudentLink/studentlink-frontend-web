import '@styles/globals.scss';

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
