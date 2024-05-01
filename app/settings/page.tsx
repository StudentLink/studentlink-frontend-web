'use client';

import { IonIcon } from '@ionic/react';
// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Next ---------------------------------------------------------
import { useCookies } from 'next-client-cookies';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import { useAppDispatch, useAppSelector } from '@lib/hooks';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import {
	chevronBackOutline,
	closeOutline,
	createOutline,
} from 'ionicons/icons';
import './styles.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '@components/Button/Button';
import { setAuth } from '@lib/features/auth/authSlice';
import Link from 'next/link';

const Settings = () => {
	const user = useAppSelector(state => state.auth);

	const [popupType, setPopupType] = useState<string | null>(null);

	return (
		<>
			<section className='settingsContainer'>
				<div className='settings'>
					<p className='title'>
						<Link
							href={`/${user.username}`}
							className='backButton'
						>
							<IonIcon icon={chevronBackOutline} />
						</Link>
						Paramètres de compte
					</p>

					<div className='container'>
						<div className='fakeInput'>
							<p className='input'>{user.username}</p>
							<button
								className='overlayButton'
								onClick={() => setPopupType('username')}
							>
								<IonIcon icon={createOutline} />
								Modifier le nom d&apos;utilisateur
							</button>
						</div>

						<div className='fakeInput'>
							<p className='input'>{user.email}</p>
							<button
								className='overlayButton'
								onClick={() => setPopupType('email')}
							>
								<IonIcon icon={createOutline} />
								Modifier l&apos;adresse mail
							</button>
						</div>

						<div className='fakeInput'>
							<p className='input'>∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗</p>
							<button
								className='overlayButton'
								onClick={() => setPopupType('password')}
							>
								<IonIcon icon={createOutline} />
								Modifier le mot de passe
							</button>
						</div>
					</div>
				</div>
			</section>

			{popupType && (
				<SettingsPopup
					userId={user.id}
					popupType={popupType}
					setPopupType={setPopupType}
				/>
			)}
		</>
	);
};

export default Settings;

const SettingsPopup = ({
	userId,
	popupType,
	setPopupType,
}: {
	userId: number;
	popupType: string;
	setPopupType: Dispatch<SetStateAction<string | null>>;
}) => {
	const dispatch = useAppDispatch();
	const cookies = useCookies();
	const displayedTitle =
		popupType == 'password'
			? 'le mot de passe'
			: popupType == 'email'
				? "l'adresse mail"
				: "le nom d'utilisateur";

	const [error, setError] = useState<string | null>(null);

	const validateUpdate = async () => {
		const inputs = document.querySelectorAll<HTMLInputElement>('.input');
		const body: { [key: string]: string } = {};

		for (let i = 0; i < inputs.length; i++) {
			const input = inputs.item(i);
			body[input.id] = input.value;
		}

		if (body.new !== body.conf) {
			setError('Les deux valeurs sont différentes');
			return;
		}

		try {
			const response = await fetch(
				`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${userId}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${cookies.get('token')}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						[popupType]: body.new,
					}),
				}
			);

			const updatedUser = await response.json();
			dispatch(setAuth(updatedUser));

			setPopupType(null);
		} catch (error) {
			console.error(error);
			setError(
				"Impossible d'appliquer les changements. Réessaie dans quelques instants."
			);
		}
	};

	return (
		<div className='settingsPopupOverlay'>
			<div className='settingsPopup'>
				<div className='header'>
					<p className='title'>
						<IonIcon icon={createOutline} />
						Modifier {displayedTitle}
					</p>

					<button
						className='closeButton'
						onClick={() => setPopupType(null)}
					>
						<IonIcon icon={closeOutline} />
					</button>
				</div>
				<div className='content'>
					{error && <p className='error'>{error}</p>}
					<input
						id='new'
						type={popupType != 'username' ? popupType : 'text'}
						className='input'
						placeholder='Nouvelle valeur'
					/>
					<input
						id='conf'
						type={popupType != 'username' ? popupType : 'text'}
						className='input'
						placeholder='Confirme la nouvelle valeur'
					/>

					<Button onClick={validateUpdate}>Sauvegarder</Button>
				</div>
			</div>
		</div>
	);
};
