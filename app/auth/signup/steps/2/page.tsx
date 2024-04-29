'use client';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import useData from './hooks/useData';
import useActions from './hooks/useActions';

// --------------------------------------------------- Components ------------------------------------------------------
import Select from 'react-select';
import Button from '@components/Button/Button';

// ----------------------------------------------------- Styles --------------------------------------------------------
import selectStyle from '../selectStyle';
import '../../../styles.scss';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import Link from 'next/link';

const Page = () => {
	const {
		error,
		setError,
		locations,
		setLocations,
		school,
		setSchool,
		dpts,
		setDpts,
		schools,
	} = useData();

	const { signUp, searchCities } = useActions(
		setError,
		setDpts,
		locations,
		school
	);

	return (
		<div className='container'>
			<Link href={'/auth/signup/steps/1'}>
				<IonIcon icon={chevronBackOutline} />
			</Link>
			<div className='heading'>
				<h1 className='title'>Inscription</h1>
				<h2 className='subTitle'>Étape 2</h2>
			</div>

			<div className='inputsContainer'>
				{error && <p className='error'>{error}</p>}

				<div
					className='inputBox'
					style={{
						border: 'none',
						backgroundColor: 'transparent',
					}}
				>
					<Select
						options={dpts.map(x => ({
							label: `${x.zip_code} - ${x.label
								.split(' ')
								.map(y => `${y[0].toUpperCase()}${y.slice(1)}`)
								.join(' ')}`,
							value: parseInt(x.insee_code),
						}))}
						closeMenuOnSelect={false}
						isMulti={true}
						noOptionsMessage={() => <span>Aucune option</span>}
						styles={selectStyle}
						placeholder="Tu es d'où ? (code postal)"
						className='input noPadding'
						onInputChange={value => searchCities(value)}
						onChange={value => {
							setLocations(value.map(x => x.value));
						}}
					/>
				</div>
				<div
					className='inputBox'
					style={{
						border: 'none',
						backgroundColor: 'transparent',
					}}
				>
					<Select
						options={schools}
						noOptionsMessage={() => <span>Aucune option</span>}
						styles={selectStyle}
						placeholder='Tu étudies où ?'
						className='input noPadding'
						onChange={(value: any) => {
							setSchool(value.value);
						}}
					/>
				</div>
			</div>

			<Button
				color='blue'
				onClick={signUp}
			>
				S'inscrire
			</Button>
		</div>
	);
};

export default Page;
