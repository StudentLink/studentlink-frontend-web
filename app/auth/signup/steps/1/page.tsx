'use client';

// -------------------------------------------------- React & Next -----------------------------------------------------
import Link from 'next/link';

// --------------------------------------------------- Components ------------------------------------------------------
import Button from '@components/Button/Button';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import useData from './hooks/useData';
import useActions from './hooks/useActions';

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import { IonIcon } from '@ionic/react';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import '../../../styles.scss';

const Page = () => {
	const { auth, pswdVisibility, setPswdVisibility, error, setError } =
		useData();
	const { signUp } = useActions(setError);

	return (
		<div className='container'>
			<div className='heading'>
				<h1 className='title'>Inscription</h1>
				<h2 className='subTitle'>Étape 1</h2>
			</div>

			<div className='inputsContainer'>
				{error && <p className='error'>{error}</p>}
				<div className='rowInputs'>
					<div className='inputBox'>
						<input
							type='text'
							id='lastname'
							className='input'
							placeholder='Nom'
							defaultValue={auth.displayname.split(' ')[1]}
						/>
					</div>
					<div className='inputBox'>
						<input
							type='text'
							id='firstname'
							className='input'
							placeholder='Prénom'
							defaultValue={auth.displayname.split(' ')[0]}
						/>
					</div>
				</div>
				<div className='inputBox'>
					<input
						type='text'
						id='username'
						className='input'
						placeholder={"Nom d'utilisateur"}
						defaultValue={auth.username}
					/>
				</div>
				<div className='inputBox'>
					<input
						type='email'
						id='email'
						className='input'
						placeholder='Adresse e-mail'
						defaultValue={auth.email}
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
				color='blue'
				onClick={signUp}
			>
				Aller à l&apos;étape 2
			</Button>
		</div>
	);
};

export default Page;
