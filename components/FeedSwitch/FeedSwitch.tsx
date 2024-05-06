// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- React & Next -----------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'next-client-cookies';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import { useAppDispatch, useAppSelector } from '@lib/hooks';
import { setType } from '@lib/features/feed/feedSlice';

// ----------------------------------------------------- Styles --------------------------------------------------------
import './styles.scss';

const FeedSwitch = () => {
	const dispatch = useAppDispatch();
	const cookies = useCookies();

	const [selectedRef, setSelectedRef] = useState<HTMLButtonElement | null>(
		null
	);
	const selectedIndicatorRef = useRef<HTMLDivElement>(null);
	const type = useAppSelector(state => state.feed.type);

	useEffect(() => {
		if (selectedRef && selectedIndicatorRef.current) {
			const bounds = selectedRef.getBoundingClientRect();
			selectedIndicatorRef.current.setAttribute(
				'style',
				`left: ${bounds.left - 4}px; width: ${bounds.width + 8}px`
			);
		}
	}, [selectedRef, selectedIndicatorRef]);

	useEffect(() => {
		const buttons: NodeListOf<HTMLButtonElement> =
			document.querySelectorAll('.feedOption');

		if (type == 'school') {
			setSelectedRef(buttons.item(1));
		} else if (type == 'locations') {
			setSelectedRef(buttons.item(2));
		} else {
			setSelectedRef(buttons.item(0));
		}
	}, [type]);

	return (
		<div className='feedSwitch'>
			<button
				className='feedOption'
				onClick={() =>
					dispatch(
						setType({
							type: 'global',
							token: cookies.get('token'),
						})
					)
				}
			>
				Global
			</button>
			<button
				className='feedOption'
				onClick={() =>
					dispatch(
						setType({
							type: 'school',
							token: cookies.get('token'),
						})
					)
				}
			>
				École
			</button>
			<button
				className='feedOption'
				onClick={() =>
					dispatch(
						setType({
							type: 'locations',
							token: cookies.get('token'),
						})
					)
				}
			>
				Autour de moi
			</button>
			<div
				ref={selectedIndicatorRef}
				className='feedSelected'
				style={
					selectedRef
						? {
								left: `${selectedRef.getBoundingClientRect().left}px`,
								width: `${selectedRef.getBoundingClientRect().width}px`,
							}
						: {}
				}
			/>
		</div>
	);
};

export default FeedSwitch;
