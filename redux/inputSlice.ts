import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnswerSlice {
	answers: object;
	createdAt: number;
}

interface Answer {
	Q: string;
	A: string;
}

interface Answers {
	id: number;
	value: Answer;
	// [key: number]: object;
}

const initialState: AnswerSlice = {
	answers: {},
	createdAt: 0,
};

export const inputSlice = createSlice({
	name: 'user-input',
	initialState,
	reducers: {
		addAnswer: (state: any, action: PayloadAction<Answers>) => {
			state.answers[action.payload.id] = action.payload.value;
		},
		addDate: (state: any, action: PayloadAction<number>) => {
			state.createdAt = action.payload;
		},
	},
});

export const { addAnswer, addDate } = inputSlice.actions;
export default inputSlice.reducer;
