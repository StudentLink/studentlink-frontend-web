'use client';

// ------------------------------------------------------ React --------------------------------------------------------
import { useCookies } from 'next-client-cookies';
// ------------------------------------------------------ Redux --------------------------------------------------------
import { useAppDispatch } from '@lib/hooks';
import { setIsLogged } from '@lib/features/auth/authSlice';
import { usePathname, useRouter } from 'next/navigation';

const Providers = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const cookies = useCookies();
	const path = usePathname();

	if (!path.startsWith('/auth')) {
		if (cookies.get('token')) {
			dispatch(setIsLogged(true));
		} else {
			router.push('/auth/signin');
		}
	}

	return <>{children}</>;
};

export default Providers;
