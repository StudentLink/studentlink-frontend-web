import { MouseEventHandler } from 'react';
import { IonIcon } from '@ionic/react';
import './styles.scss';

interface Params {
	text: string;
	icon?: string | null;
	color?: 'blue' | 'pink' | 'yellow' | 'green';
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
	text,
	icon,
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
			{icon && <IonIcon icon={icon} />}
			{text}
		</button>
	);
};

export default Button;
