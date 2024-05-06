import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import feedSlice from './features/feed/feedSlice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			auth: authSlice,
			feed: feedSlice,
		},
	});
};

// Infer the type of makeStore

export type AppStore = ReturnType<typeof makeStore>;
// Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
