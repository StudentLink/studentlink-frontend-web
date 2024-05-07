'use client';

import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import PostType from '@customTypes/post';
import Post from '@components/Post/Post';

import './styles.scss';
import Link from 'next/link';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

const Page = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const cookies = useCookies();

	const [post, setPost] = useState<PostType | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`https://studentlink.etudiants.ynov-bordeaux.com/api/posts/${id}`,
					{
						headers: {
							Authorization: `Bearer ${cookies.get('token')}`,
						},
					}
				);

				const data = await response.json();

				setPost(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		post && (
			<div className='postPageContainer'>
				<Link href={'/'}>
					<IonIcon icon={chevronBackOutline} />
				</Link>
				<Post
					post={post}
					canComment
				/>
			</div>
		)
	);
};

export default Page;
