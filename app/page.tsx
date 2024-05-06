'use client';

// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- React & Next -----------------------------------------------------
import { useRef, useState } from 'react';
import { useCookies } from 'next-client-cookies';

// ------------------------------------------------------ Hooks --------------------------------------------------------
import { useAppSelector } from '@lib/hooks';

// --------------------------------------------------- Components ------------------------------------------------------
import Select from 'react-select';
import FeedSwitch from '@components/FeedSwitch/FeedSwitch';
import Post from '@components/Post/Post';

// ------------------------------------------------------ Utils --------------------------------------------------------
import City from '@customTypes/city';

// ------------------------------------------------- Assets & Styles ---------------------------------------------------
import { IonIcon } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import selectStyle from '@/styles/selectStyle';
import './styles.scss';
import useActions from './hooks/useActions';

const Feed = () => {
	const cookies = useCookies();
	const postRef = useRef<HTMLTextAreaElement>(null);
	const posts = useAppSelector(state => state.feed.posts);
	const [dpts, setDpts] = useState<City[]>([]);
	const [location, setLocation] = useState<string | null>(null);

	const { sendPost, searchCities } = useActions(
		setDpts,
		postRef,
		cookies,
		location
	);

	return (
		<div className='feed'>
			<FeedSwitch />

			<div className='createContainer'>
				<span
					ref={postRef}
					className='createInput'
					contentEditable
				/>
				<div className='createFooter'>
					<Select
						options={dpts.map(x => ({
							label: `${x.zip_code} - ${x.label
								.split(' ')
								.map(y => `${y[0].toUpperCase()}${y.slice(1)}`)
								.join(' ')}`,
							value: parseInt(x.insee_code),
						}))}
						closeMenuOnSelect={false}
						noOptionsMessage={() => <span>Aucune option</span>}
						styles={{
							...selectStyle,
							container: (base, _) => ({
								...base,
								width: '100%',
							}),
						}}
						placeholder="Tu parles d'où ? (code postal)"
						className='input noPadding'
						onInputChange={value => searchCities(value)}
						onChange={({ value }) => {
							setLocation(value);
						}}
					/>

					<button
						className='createButton'
						onClick={sendPost}
					>
						<IonIcon icon={sendOutline} />
						Publier
					</button>
				</div>
			</div>

			<div className='postsContainer'>
				{posts.map(post => (
					<Post
						key={`post#${post.id}`}
						post={post}
						previewComments
					/>
				))}
			</div>
		</div>
	);
};

export default Feed;
