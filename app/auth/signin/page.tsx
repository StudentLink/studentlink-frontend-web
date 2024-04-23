'use client';

// ------------------------------------------------------ React --------------------------------------------------------
import { useState } from 'react';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import useActions from './hooks/useActions';

// --------------------------------------------------- Components ------------------------------------------------------
import Link from 'next/link';
import Button from '@components/Button/Button';

// ----------------------------------------------------- Styles --------------------------------------------------------
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import '../styles.scss';

const Auth = () => {
	const [pswdVisibility, setPswdVisibility] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { signIn } = useActions(setError);

	return (
		<div className='container'>
			<div className='heading'>
				<h1 className='title'>Connexion</h1>
			</div>

			<div className='inputsContainer'>
				{error && <p className='error'>{error}</p>}
				<div className='inputBox'>
					<input
						type='email'
						id='username'
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

				<Link
					href={'/auth/signup/steps/1'}
					className='link'
				>
					Pas encore de compte ?
				</Link>
			</div>

			<Button
				color='blue'
				onClick={signIn}
			>
				Se connecter
			</Button>
		</div>
	);
};

export default Auth;
