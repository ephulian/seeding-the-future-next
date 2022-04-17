import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionsSlice {
	questions: object;
}

interface Question {
	[key: string]: string;
}

const initialState: any = {};

export const questionSlice = createSlice({
	name: 'user-input',
	initialState,
	reducers: {
		addQuestions: (state: any, action: any) => {
			state.questions = action.payload;
		},
	},
});

export const { addQuestions } = questionSlice.actions;
export default questionSlice.reducer;
