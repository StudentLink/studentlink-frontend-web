// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useEffect, useState } from 'react';

// ------------------------------------------------------ Types --------------------------------------------------------
import Post from '@customTypes/post';
import Comment from '@customTypes/comment';
import { jwtDecode } from 'jwt-decode';

const colors = ['2ab2f7', '5da800', 'cc0052', 'ccb200'];

const useData = (
	post: Post,
	previewComments: boolean,
	token: string | undefined
) => {
	const [formattedComments, setFormattedComments] = useState<Comment[]>([]);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [isSelf, setIsSelf] = useState(false);

	useEffect(() => {
		if (
			!post.comments ||
			!post.user.id ||
			!post.user.name ||
			!previewComments ||
			!token
		) {
			return;
		}

		const decodedToken = jwtDecode(token ?? '');

		(async () => {
			const pictureRequest = await fetch(
				`https://ui-avatars.com/api/?format=png&size=512&rounded=true&color=0c1920&background=${colors[getRandomArbitrary(0, colors.length)]}&name=${post.user.name.replaceAll(/[ -'_]+/g, '+')}`
			);
			const picture = URL.createObjectURL(await pictureRequest.blob());

			setProfileImage(picture);

			if (post.comments.length > 0) {
				let comments = JSON.parse(JSON.stringify(post.comments));

				if (previewComments) {
					comments = comments.slice(0, 2);
				}

				for (let i = 0; i < comments.length; i++) {
					try {
						const pictureRequest = await fetch(
							`https://ui-avatars.com/api/?format=png&size=512&rounded=true&color=0c1920&background=${colors[getRandomArbitrary(0, colors.length)]}&name=${comments[i].user.name.replaceAll(/[ -'_]+/g, '+')}`
						);
						const picture = URL.createObjectURL(
							await pictureRequest.blob()
						);

						comments[i].user = {
							...comments[i].user,
							picture: picture,
						};

						if (
							`${decodedToken.sub}` == `${comments[i].user.id}` ||
							((decodedToken as any).roles as string[]).includes(
								'ROLE_ADMIN'
							)
						) {
							comments[i].isSelf = true;
						}
					} catch (error) {
						console.error(error);
					}
				}

				setFormattedComments(comments);
			}
		})();

		if (
			`${decodedToken.sub}` == `${post.user.id}` ||
			((decodedToken as any).roles as string[]).includes('ROLE_ADMIN')
		) {
			setIsSelf(true);
		}
	}, [post.comments, post.user.id, post.user.name, previewComments, token]);

	return {
		formattedComments,
		profileImage,
		isSelf,
	};
};

export default useData;

const getRandomArbitrary = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
};
