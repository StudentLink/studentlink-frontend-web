import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@lib/hooks';
import { setAuth } from '@lib/features/auth/authSlice';
import { useCookies } from 'next-client-cookies';
import { jwtDecode } from 'jwt-decode';

const useActions = (setError: Dispatch<SetStateAction<string | null>>) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const cookies = useCookies();

	const signUp = async () => {
		const inputs = document.querySelectorAll('input');

		const data: { [key: string]: string } = {};

		// Get & format data from inputs
		for (let i = 0; i < inputs.length; i++) {
			const input = inputs.item(i);

			data[input.id] = input.value;
		}

		if (data.lastname.length < 3) {
			setError('Nom invalide');
			return;
		}
		if (data.firstname.length < 3) {
			setError('Prénom invalide');
			return;
		}
		if (data.username.length < 5) {
			setError("Nom d'utilisateur invalide");
			return;
		}

		if (
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
				data.email
			) == false
		) {
			setError('Adresse mail invalide');
			return;
		}

		if (
			/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_]).*$/.test(
				data.password
			) == false ||
			/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_]).*$/.test(
				data.confpassword
			) == false
		) {
			setError('Mot de passe invalide');
			return;
		}

		if (data.password != data.confpassword) {
			setError('Les mots de passe ne correspondent pas');
			return;
		}

		setError(null);

		const user = {
			name: `${data.firstname[0].toUpperCase()}${data.firstname.slice(1)} ${data.lastname.toUpperCase()}`,
			username: data.username,
			email: data.email,
			password: data.password,
		};

		dispatch(setAuth(user));

		try {
			const req = await fetch(
				`https://studentlink.etudiants.ynov-bordeaux.com/api/users${cookies.get('token') ? `/${data.username}` : ''}`,
				{
					method: cookies.get('token') ? 'PUT' : 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${cookies.get('token') || ''}`,
					},
					body: JSON.stringify({
						...user,
						role: 'ROLE_USER',
					}),
				}
			);

			const res = await req.json();

			if (!req.ok) {
				setError(res.message);
				return;
			}

			const expires = jwtDecode(res.token).exp;

			cookies.set('token', res.token, {
				path: '/',
				expires: expires ? new Date(expires * 1000) : 0,
			});
		} catch (error) {
			console.error(error);
			setError(
				"Une erreur s'est produite. Réessaie dans quelques secondes"
			);
			return;
		}

		router.push('/auth/signup/steps/2');
	};

	return {
		signUp,
	};
};

export default useActions;
