'use client';

import { useAppSelector } from '@lib/hooks';
import { useRouter } from 'next/navigation';

const Providers = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();

	const isLogged = useAppSelector(state => state.auth.isLogged);

	if (isLogged) {
		router.push('/');
	}

	return children;
};

export default Providers;
