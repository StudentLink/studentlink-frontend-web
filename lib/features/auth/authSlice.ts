import School from '@customTypes/school';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
	id: number;
	name: string;
	username: string;
	email: string;
	locations: number[];
	school: School | null;
	isLogged: boolean;
	createdAt: string;
	picture: string | null;
	roles: string[];
}

const initialState: AuthState = {
	id: -1,
	name: '',
	username: '',
	email: '',
	locations: [],
	school: null,
	isLogged: false,
	createdAt: '',
	picture: null,
	roles: [],
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
