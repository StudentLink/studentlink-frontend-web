'use client';

// -------------------------------------------------- React & Next -----------------------------------------------------
import { useState } from 'react';
import Link from 'next/link';

// --------------------------------------------------- Components ------------------------------------------------------
import Button from '@components/Button/Button';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import useActions from './hooks/useActions';

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import { IonIcon } from '@ionic/react';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import '../../../styles.scss';

const Page = () => {
	const [pswdVisibility, setPswdVisibility] = useState(false);
	const [error, setError] = useState<string | null>('');

	const { showNextStep } = useActions(setError);

	return (
		<div className='container'>
			<h1 className='title'>Inscription</h1>

			<div className='inputsContainer'>
				{error && <p className='error'>{error}</p>}
				<div className='rowInputs'>
					<div className='inputBox'>
						<input
							type='text'
							id='lastname'
							className='input'
							placeholder='Nom'
						/>
					</div>
					<div className='inputBox'>
						<input
							type='text'
							id='firstname'
							className='input'
							placeholder='Prénom'
						/>
					</div>
				</div>
				<div className='inputBox'>
					<input
						type='text'
						id='username'
						className='input'
						placeholder={"Nom d'utilisateur"}
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
						style={{
							paddingRight: '35px',
						}}
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
						style={{
							paddingRight: '35px',
						}}
					/>
					<IonIcon
						icon={pswdVisibility ? eyeOffOutline : eyeOutline}
						className='icon'
						onClick={() => setPswdVisibility(prev => !prev)}
					/>
				</div>

				<Link
					href={'/auth/signin'}
					className='link'
				>
					Déjà un compte ?
				</Link>
			</div>

			<Button
				text="Aller à l'étape 2"
				color='blue'
				onClick={showNextStep}
			/>
		</div>
	);
};

export default Page;
