import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnswerSlice {
	answers: object;
	createdAt: number;
}

interface Answer {
	[key: string]: string;
}

const initialState: AnswerSlice = {
	answers: {},
	createdAt: 0,
};

export const inputSlice = createSlice({
	name: 'user-input',
	initialState,
	reducers: {
		addAnswer: (state: any, action: PayloadAction<Answer>) => {
			state.answers[action.payload.id] = action.payload.value;
		},
		addDate: (state: any, action: PayloadAction<number>) => {
			state.createdAt = action.payload;
		},
	},
});

export const { addAnswer, addDate } = inputSlice.actions;
export default inputSlice.reducer;
