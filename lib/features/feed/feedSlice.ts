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
			return {
				...state,
				type: action.payload,
			};
		},

		setPosts(state, action) {
			if (!Array.isArray(action.payload)) {
				return state;
			}

			return {
				...state,
				posts: action.payload,
			};
		},
	},
});

export const { setType, setPosts } = feedSlice.actions;

export default feedSlice.reducer;
