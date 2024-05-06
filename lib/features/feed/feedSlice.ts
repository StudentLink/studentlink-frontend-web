import Post from '@customTypes/post';
import { createSlice, current } from '@reduxjs/toolkit';

interface FeedState {
	type: 'global' | 'school' | 'locations';
	posts: Post[];
}

const initialState: FeedState = {
	type: 'global',
	posts: [],
};

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		setType(state, action) {
			const { type, token } = action.payload;

			if (!type || !token) {
				return state;
			}

			// try {
			// 	fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/${type != 'global' ? type : ''}`, {
			// 		headers: {
			// 			Authorization: token,
			// 		}
			// 	}).then(response => response.json()).then(data => {
			// 		return {
			// 			...state,
			// 		}
			// 	});

			// 	return {
			// 		...state,
			// 		type: type,
			// 	};
			// } catch (error) {
			// 	console.error(error);
			// }

			return {
				...state,
				type: type,
			};
			return state;
		},
	},
});

export const { setType } = feedSlice.actions;

export default feedSlice.reducer;
