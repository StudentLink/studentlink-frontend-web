'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@components/Button/Button';
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import '../styles.scss';
import { useCookies } from 'next-client-cookies';
import { jwtDecode } from 'jwt-decode';

const Auth = () => {
	const cookies = useCookies();

	const [pswdVisibility, setPswdVisibility] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const signIn = async () => {
		setIsLoading(true);
		setError(null);
		const inputs = document.querySelectorAll<HTMLInputElement>('.input');

		const body: { [key: string]: string } = {};

		for (let i = 0; i < inputs.length; i++) {
			const input = inputs.item(i);

			body[input.id] = input.value;
		}

		// const response = await fetch('https://studentlink.io/api/login_check', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(body),
		// });

		// const data = await response.json();
		const { token } = {
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE3MTI2NzEzMjEsImV4cCI6MTc0NDE2NDAwMCwic3ViIjoiNCIsInJvbGVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwiZW1haWwiOiJhZG1pbkBzdHVkZW50bGluay5jb20ifQ.dIrMHiM-SRMgGrG7jFzjpTVWHzYOKZXzQm7IjEpUnsfKGaj5OASq6t-sAkdJ9dgvaUQa_haQ7D_gMMEa2T6RqBZCYqPIya2_LojKRcci9sBi2FqXhB6v-zjvIEGEdPfzPfndpIbdfg6mjlwXZFyFLRf8CPHmUcBOogp6Rw0htSemOwOPnkZx_euaI_-BLssxF92cOIm35YPhamN6tqnhbAgLtZbF59gYC89zn4YUJER7BWFJ_eAbSwiP0kEcqvqbj3MPCV7cvgaoL9DN6XaY0SVLjmw7ZK-rpjSeWz_-FinUO6WMIeakTri8T0Q0m3HkxZ1eMQ_pG3P69z0kp5U7VMuW8VZwTJfvQt9tMwfGIb9kxh1rfyd_1Yu-kcjsZPEPWlotd-BRlKRT5HR2YRNeMrTajZujZEzIcTG_SvD2LFzh9-TU27KlQ31xIWF6MOCde55pU0SXcydqlXnM7jHHukMpLoWYGRLd3ZUPxi4lhUeoT51NvLGlCJENhRmxdlhFoNSNIQcsH9yIhK2nzc10d6oD2FU0BCz0YpUQOU7PCFCvLwVhz7YbcqDZXmCFllyEMOYtpZLmT4VIwVG49DJA76e3Pq96vAAGUfj35i7wReRyFfi6Qz4nY-M9livLQp6lqnB1lT7pkTNpyg3NFnbuMFR9Rbc7N7nlQSsBC4tabe4',
		};

		if (!token) {
			setError('Identifiants incorrects.');
		}

		const expires = jwtDecode(token).exp;

		console.log(expires);

		cookies.set('token', token, {
			path: '/',
			expires: expires ? new Date(expires * 1000) : 0,
		});

		setIsLoading(false);
	};

	return (
		<div className='container'>
			<h1 className='title'>Connexion</h1>

			<div className='inputsContainer'>
				{error && <p className='error'>{error}</p>}
				<div className='inputBox'>
					<input
						type='email'
						className='input'
						placeholder='Adresse e-mail'
					/>
				</div>
				<div className='inputBox'>
					<input
						type={pswdVisibility ? 'text' : 'password'}
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
					href={'/auth/signup'}
					className='link'
				>
					Pas encore de compte ?
				</Link>
			</div>

			<Button
				text='Se connecter'
				color='blue'
				onClick={signIn}
				disabled={isLoading}
			/>
		</div>
	);
};

export default Auth;
