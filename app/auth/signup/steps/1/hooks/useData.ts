import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@lib/hooks';

const useData = () => {
	const router = useRouter();

	const [pswdVisibility, setPswdVisibility] = useState(false);
	const [error, setError] = useState<string | null>('');

	const auth = useAppSelector(state => state.auth);

	useEffect(() => {
		if (auth.isLogged) {
			router.push('/');
		}
	}, []);

	return { auth, pswdVisibility, setPswdVisibility, error, setError };
};

export default useData;
