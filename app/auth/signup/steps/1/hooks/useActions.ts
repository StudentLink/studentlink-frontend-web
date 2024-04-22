import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@lib/hooks';
import { setAuth } from '@lib/features/auth/authSlice';

const useActions = (setError: Dispatch<SetStateAction<string | null>>) => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const showNextStep = () => {
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

		dispatch(
			setAuth({
				name: `${data.firstname[0].toUpperCase()}${data.firstname.slice(0)} ${data.lastname.toUpperCase()}`,
				username: `${data.username}`,
				email: `${data.email}`,
				password: `${data.password}`,
			})
		);

		router.push('/auth/signup/steps/2');
	};

	return {
		showNextStep,
	};
};

export default useActions;
