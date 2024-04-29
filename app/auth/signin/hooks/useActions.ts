import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import { jwtDecode } from 'jwt-decode';

const useActions = (setError: Dispatch<SetStateAction<string | null>>) => {
	const router = useRouter();
	const cookies = useCookies();

	const signIn = async () => {
		setError(null);
		const inputs = document.querySelectorAll<HTMLInputElement>('.input');

		const body: { [key: string]: string } = {};

		for (let i = 0; i < inputs.length; i++) {
			const input = inputs.item(i);

			body[input.id] = input.value;
		}

		try {
			const request = await fetch(
				'https://studentlink.etudiants.ynov-bordeaux.com/api/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				}
			);

			const response = await request.json();

			if (!request.ok) {
				setError(response.message);
				return;
			}

			const expires = jwtDecode(response.token).exp;

			cookies.set('token', response.token, {
				path: '/',
				expires: expires ? new Date(expires * 1000) : 0,
			});

			router.push('/');
		} catch (error) {
			console.error(error);
		}
	};

	return { signIn };
};

export default useActions;
