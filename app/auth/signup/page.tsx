'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@components/Button/Button';
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import '../styles.scss';

const Auth = () => {
	const [pswdVisibility, setPswdVisibility] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const signUp = () => {
		setError(null);
		setIsLoading(true);

		const inputs = document.querySelectorAll<HTMLInputElement>('.input');

		const data: { [key: string]: string } = {};

		for (let i = 0; i < inputs.length; i++) {
			const input = inputs.item(i);

			if (input) {
				data[input.id] = input.value;
			}
		}

		if (data.confpassword !== data.password) {
			setError('Passwords does not match.');
			return;
		}

		setIsLoading(false);
	};

	return (
		<div className='container'>
			<h1 className='title'>Inscription</h1>

			<div className='inputsContainer'>
				{error && <p className='error'>{error}</p>}
				<div className='inputBox'>
					<input
						type='text'
						id='name'
						className='input'
						placeholder='Nom prénom'
					/>
				</div>
				<div className='inputBox'>
					<input
						type='email'
						id='email'
						className='input'
						placeholder='Adresse e-mail'
					/>
				</div>
				<div className='inputBox'>
					<input
						type={pswdVisibility ? 'text' : 'password'}
						id='password'
						className='input'
						placeholder='Mot de passe'
					/>
					<IonIcon
						icon={pswdVisibility ? eyeOffOutline : eyeOutline}
						className='icon'
						onClick={() => setPswdVisibility(prev => !prev)}
					/>
				</div>
				<div className='inputBox'>
					<input
						type={pswdVisibility ? 'text' : 'password'}
						id='confpassword'
						className='input'
						placeholder='Confirmer le mot de passe'
					/>
					<IonIcon
						icon={pswdVisibility ? eyeOffOutline : eyeOutline}
						className='icon'
						onClick={() => setPswdVisibility(prev => !prev)}
					/>
				</div>
				{/* Select custom (avec barre de recherche) pour trouver l'école */}

				<Link
					href={'/auth/signin'}
					className='link'
				>
					Déjà un compte ?
				</Link>
			</div>

			<Button
				text="S'inscrire"
				color='blue'
				onClick={signUp}
				disabled={isLoading}
			/>
		</div>
	);
};

export default Auth;
