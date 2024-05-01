'use client';

// ------------------------------------------------------ Next ---------------------------------------------------------
import { useCookies } from 'next-client-cookies';
import { usePathname, useRouter } from 'next/navigation';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import { useAppDispatch } from '@lib/hooks';
import { setAuth, setIsLogged } from '@lib/features/auth/authSlice';

// ------------------------------------------------------ Utils --------------------------------------------------------
import { jwtDecode } from 'jwt-decode';

const Providers = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const cookies = useCookies();
	const path = usePathname();

	if (!path.startsWith('/auth')) {
		const token = cookies.get('token');

		if (token) {
			dispatch(setIsLogged(true));
			useGetUser(token);
		} else {
			router.push('/auth/signin');
		}
	}

	return <>{children}</>;
};

export default Providers;

const useGetUser = async (token: string) => {
	const dispatch = useAppDispatch();
	const userId = jwtDecode(token).sub;

	if (!userId) return;

	try {
		const response = await fetch(
			`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const user = await response.json();

		dispatch(setAuth(user));
	} catch (error) {
		console.error(error);
	}
};
