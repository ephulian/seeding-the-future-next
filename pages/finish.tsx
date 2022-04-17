import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '../redux/inputSlice';
import { server } from './api/config';

// import { openai } from '../config/openai-config';

export default function Finish() {
	const [answer, setAnswer] = useState<any>();

	const router = useRouter();
	const dispatch = useDispatch();

	const now = Date.now();

	dispatch(addDate(now));

	const store = useSelector((state) => state);
	const answers = store.userInput.answers;
	console.log(store);

	const getManifesto = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		axios
			.post(`${server}/api/open-ai`, {
				question: `Q: ${answers[1].Q} \nA: ${answers[1].A}\n\nQ: ${answers[2].Q}\nA: ${answers[2].A}\n\nQ: ${answers[3].Q}\nA: ${answers[3].A}\n\nQ: ${answers[4].Q}\nA: ${answers[4].A}\n\nQ: ${answers[5].Q}\nA: ${answers[5].A}\n\nQ: ${answers[6].Q}\nA: ${answers[6].A}\n\nQ: Generate a manifesto?`,
				// question:
				// 	'Q: Use a word to describe the feelings of post-pandemic times?\n\nA: Anxious.\n\nQ: What truly matters to you in the future world?\n\nA: Peace.\n\nQ: Use a word to define the future city?\n\nA: Spectacular.\n\nQ: Who is the right partner if you were to start a business in 2030?\n\nA: A. Someone who is competitive, ambitious, and able to deal with uncertainty.\n\nQ: Imagine you are a fashion brand CEO selecting a co-creator, from different industry, to collaborate with on a social media platform. Who is the best person?\n\nA: B. Journalist or blogger elected by the audience by voting\n\nQ: The best society in the future is one where people? A: D. Have equal income and opportunities.\n\nQ: Generate a manifesto?',
			})
			.then((res) => {
				console.log(res.data);
				setAnswer(res.data.choices[0].text.substring(2));
			})
			.catch((err) => console.log(err));
	};

	const manifesto = answer ? answer.substring(2) : 'Generate manifesto!';

	return (
		<div className='section-center'>
			<h1>{manifesto}</h1>
			{/* <h1>Submitted!</h1> */}
			<button onClick={(e) => getManifesto(e)}>Go!</button>
			{/* <button onClick={() => router.push('/')}>Back to beginning</button> */}
		</div>
	);
}
