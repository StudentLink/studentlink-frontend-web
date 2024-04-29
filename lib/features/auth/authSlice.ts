import School from '@customTypes/school';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	displayname: string;
	username: string;
	email: string;
	locations: number[];
	school: School | null;
	isLogged: boolean;
}

const initialState: AuthState = {
	displayname: '',
	username: '',
	email: '',
	locations: [],
	school: null,
	isLogged: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(state, action) {
			return {
				...state,
				...action.payload,
			};
		},

		setIsLogged(state, action) {
			return {
				...state,
				isLogged: action.payload,
			};
		},
	},
});

export const { setAuth, setIsLogged } = authSlice.actions;

export default authSlice.reducer;
