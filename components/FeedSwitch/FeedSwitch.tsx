// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- React & Next -----------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'next-client-cookies';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import { useAppDispatch, useAppSelector } from '@lib/hooks';
import { setPosts, setType } from '@lib/features/feed/feedSlice';

// ----------------------------------------------------- Styles --------------------------------------------------------
import './styles.scss';
import Post from '@customTypes/post';

const FeedSwitch = () => {
	const dispatch = useAppDispatch();
	const cookies = useCookies();

	const [selectedRef, setSelectedRef] = useState<HTMLButtonElement | null>(
		null
	);
	const containerRef = useRef<HTMLDivElement>(null);
	const selectedIndicatorRef = useRef<HTMLDivElement>(null);
	const type = useAppSelector(state => state.feed.type);

	// Simulate a click to get some posts at page load

	const handleClick = async (type: 'global' | 'school' | 'locations') => {
		dispatch(setType(type));

		try {
			const feedRequest = await fetch(
				`https://studentlink.etudiants.ynov-bordeaux.com/api/feed${type != 'global' ? `/${type}` : ''}`,
				{
					headers: {
						Authorization: `Bearer ${cookies.get('token')}`,
					},
				}
			);

			const feedData: Post[] = await feedRequest.json();

			dispatch(setPosts(feedData));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		handleClick('global');
	}, []);

	useEffect(() => {
		if (
			selectedRef &&
			selectedIndicatorRef.current &&
			containerRef.current
		) {
			const containerBounds =
				containerRef.current.getBoundingClientRect();
			const bounds = selectedRef.getBoundingClientRect();
			selectedIndicatorRef.current.setAttribute(
				'style',
				`left: ${bounds.left - containerBounds.left - 4}px; width: ${bounds.width + 8}px`
			);
		}
	}, [selectedRef]);

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
		<div
			ref={containerRef}
			className='feedSwitch'
		>
			<button
				className='feedOption'
				onClick={() => handleClick('global')}
			>
				Global
			</button>
			<button
				className='feedOption'
				onClick={() => handleClick('school')}
			>
				École
			</button>
			<button
				className='feedOption'
				onClick={() => handleClick('locations')}
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
