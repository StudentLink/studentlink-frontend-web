import { GroupBase, StylesConfig } from 'react-select';

const style: StylesConfig<
	{
		label: string;
		value: number;
	},
	true,
	GroupBase<{
		label: string;
		value: number;
	}>
> = {
	control: (base, _) => ({
		...base,
		borderWidth: '2px',
		borderColor: 'var(--blue)',
		backgroundColor: 'var(--black-3)',
	}),
	indicatorSeparator: (base, _) => ({
		...base,
		backgroundColor: 'var(--blue)',
	}),
	dropdownIndicator: (base, _) => ({
		...base,
		'> svg > *': {
			color: 'var(--blue) !important',
		},
	}),
	placeholder: (base, _) => ({
		...base,
		color: 'var(--blue)',
	}),
	singleValue: (base, _) => ({
		...base,
		color: 'var(--blue)',
	}),
	menuList: (base, _) => ({
		...base,
		borderRadius: '7px',
		backgroundColor: 'var(--black-3)',
	}),
	option: (base, state) => ({
		...base,
		background: state.isSelected ? 'var(--black-3)' : 'transparent',
		filter: state.isSelected ? 'brightness(1.1)' : '',
		color: 'var(--white)',
		cursor: 'pointer',
		':hover': {
			backgroundColor: 'var(--black-4)',
			color: state.isSelected ? 'var(--white)' : 'var(--blue)',
		},
		':active, :focus': {
			backgroundColor: state.isSelected
				? 'var(--black-4)'
				: 'transparent',
		},
	}),
	menu: (base, _) => ({
		...base,
		border: '2px solid var(--blue)',
		borderRadius: '7px',
		background: 'transparent',
		overflow: 'hidden',
	}),
	input: (base, _) => ({
		...base,
		color: 'var(--white)',
	}),
	multiValue: (base, _) => ({
		...base,
		backgroundColor: 'var(--black-5)',
	}),
	multiValueLabel: (base, _) => ({
		...base,
		color: 'var(--white)',
	}),
	multiValueRemove: (base, _) => ({
		...base,
		marginLeft: '5px',

		':hover': {
			backgroundColor: 'var(--pink)',
		},
	}),
};

export default style;
