'use client';

// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- React & Next -----------------------------------------------------
import { useEffect, useRef, useState } from 'react';
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
import School from '@customTypes/school';

const Feed = () => {
	const cookies = useCookies();

	const postRef = useRef<HTMLTextAreaElement>(null);

	const posts = useAppSelector(state => state.feed.posts);
	const feedType = useAppSelector(state => state.feed.type);

	const [selectData, setSelectData] = useState<any[]>([]);
	const [selectValue, setSelectValue] = useState<string | null>(null);
	const [schools, setSchools] = useState<any[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const request = await fetch(
					'https://studentlink.etudiants.ynov-bordeaux.com/api/schools'
				);

				const schools = await request.json();

				setSchools(
					schools.map((x: School) => ({
						label: x.name,
						value: x.id,
					}))
				);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const { sendPost, searchCities } = useActions(
		postRef,
		cookies,
		setSelectData,
		selectValue,
		feedType
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
					{feedType != 'school' ? (
						<Select
							options={selectData}
							noOptionsMessage={() => <span>Aucune option</span>}
							placeholder={"Tu parles d'où ? (code postal)"}
							className='input noPadding'
							styles={{
								...selectStyle,
								container: (base, _) => ({
									...base,
									width: '100%',
								}),
							}}
							onInputChange={value => searchCities(value)}
							onChange={({ value }: any) => {
								setSelectValue(value);
							}}
						/>
					) : (
						<Select
							options={schools}
							noOptionsMessage={() => <span>Aucune option</span>}
							placeholder={'De quelle école tu parles ?'}
							className='input noPadding'
							styles={{
								...selectStyle,
								container: (base, _) => ({
									...base,
									width: '100%',
								}),
							}}
							onChange={({ value }: any) => {
								setSelectValue(value);
							}}
						/>
					)}

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
