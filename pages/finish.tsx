import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '../redux/inputSlice';

// import { openai } from '../config/openai-config';

export default function Finish() {
	const [answer, setAnswer] = useState<any>();

	const router = useRouter();
	const dispatch = useDispatch();

	const now = Date.now();

	dispatch(addDate(now));

	const store = useSelector((state) => state);
	// console.log(store);

	// const getAnswer = async (question: string) => {
	// 	const gptResponse = await openai
	// 		.complete({
	// 			engine: 'davinci',
	// 			prompt: question,
	// 			maxTokens: 5,
	// 			temperature: 0.9,
	// 			topP: 1,
	// 			presencePenalty: 0,
	// 			frequencyPenalty: 0,
	// 			bestOf: 1,
	// 			n: 1,
	// 			stream: false,
	// 			stop: ['\n', 'testing'],
	// 		})
	// 		.then((value) => {
	// 			setAnswer(value);
	// 			console.log(answer);
	// 		});
	// };

	return (
		<div className='section-center'>
			<h1>{answer ? answer : 'Submitted!'}</h1>
			<button onClick={() => {}}>Back to beginning</button>
			{/* <button onClick={() => router.push('/')}>Back to beginning</button> */}
		</div>
	);
}
