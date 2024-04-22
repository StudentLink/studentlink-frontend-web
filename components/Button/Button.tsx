import { MouseEventHandler } from 'react';
import './styles.scss';

interface Params {
	children: React.ReactNode | null;
	color?: 'blue' | 'pink' | 'yellow' | 'green';
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
	children,
	color = 'blue',
	disabled = false,
	onClick = () => {},
}: Params) => {
	return (
		<button
			onClick={onClick}
			className='button'
			style={{
				backgroundColor: `var(--${color})`,
				boxShadow: `0 5px 0 var(--darken-${color})`,
			}}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
