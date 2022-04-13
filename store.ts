import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './redux/inputSlice';

export const store = configureStore({
	reducer: {
		userInput: inputReducer,
	},
});
