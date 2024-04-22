'use client';

import { useState } from 'react';
import Select from 'react-select';
import useData from './hooks/useData';
import selectStyle from '../selectStyle';
import '../../../styles.scss';

const Page = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { dpts, schools } = useData();

	return (
		<div>
			<Select
				options={dpts}
				closeMenuOnSelect={false}
				isMulti={true}
				noOptionsMessage={() => <span>Aucune option</span>}
				// placeholder=''
				styles={selectStyle}
			/>
		</div>
	);
};

export default Page;
