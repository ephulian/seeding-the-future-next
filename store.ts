import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './redux/inputSlice';
import questionsReducer from './redux/questionsSlice';

export const store = configureStore({
	reducer: {
		userInput: inputReducer,
		questions: questionsReducer,
	},
});
