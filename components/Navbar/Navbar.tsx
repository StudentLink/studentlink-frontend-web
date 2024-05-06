'use client';

// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- React & Next -----------------------------------------------------
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCookies } from 'next-client-cookies';

// ------------------------------------------------------ Utils --------------------------------------------------------
import { jwtDecode } from 'jwt-decode';

// ----------------------------------------------------- Styles --------------------------------------------------------
import { IonIcon } from '@ionic/react';
import { homeOutline, personOutline, settingsOutline } from 'ionicons/icons';
import appLogo from '@/public/assets/logo.png';
import './styles.scss';
import Image from 'next/image';

const Navbar = () => {
	const path = usePathname();
	const cookies = useCookies();

	const userId = jwtDecode(cookies.get('token') ?? '').sub;

	return (
		<div className='navbar'>
			<Image
				src={appLogo}
				alt={'appLogo'}
				width={300}
				height={300}
				className='navHeader'
				priority
			/>

			<div className='navContent'>
				<Link
					href={'/'}
					className='navLink'
				>
					<IonIcon icon={homeOutline} />
					Accueil
				</Link>
				<Link
					href={`/${userId}`}
					className='navLink'
				>
					<IonIcon icon={personOutline} />
					Profil
				</Link>
				<Link
					href={'/settings'}
					className='navLink'
				>
					<IonIcon icon={settingsOutline} />
					Paramètres
				</Link>
			</div>

			<div />
		</div>
	);
};

export default Navbar;
