import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface AuthState {
	name: string;
	username: string;
	email: string;
	password: string;
	localisation: string[];
	school: string;
}

const initialState: AuthState = {
	name: '',
	username: '',
	email: '',
	password: '',
	localisation: [],
	school: '',
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
	},
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
