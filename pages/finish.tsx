import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '../redux/inputSlice';
import { server } from './api/config';
import styles from '../styles/Final.module.scss';

export default function Finish() {
	const [answer, setAnswer] = useState<string>('');
	const [manifesto, setManifesto] = useState<any>('Generate manifesto!');

	const dispatch = useDispatch();
	const router = useRouter();

	const now = Date.now();

	dispatch(addDate(now));

	const store: any = useSelector((state) => state);
	const answers = store.userInput.answers;
	// console.log(store);

	const getManifesto = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setManifesto('Generating....');
		axios
			.post(`${server}/api/openai/manifesto`, {
				// question: `Q: ${answers[1].Q} \nA: ${answers[1].A}\n\nQ: ${answers[2].Q}\nA: ${answers[2].A}\n\nQ: ${answers[3].Q}\nA: ${answers[3].A}\n\nQ: ${answers[4].Q}\nA: ${answers[4].A}\n\nQ: ${answers[5].Q}\nA: ${answers[5].A}\n\nQ: ${answers[6].Q}\nA: ${answers[6].A}\n\nQ: Generate a manifesto?`,
				// question:
				// 	'Q: Use a word to describe the feelings of post-pandemic times?\n\nA: Anxious.\n\nQ: What truly matters to you in the future world?\n\nA: Peace.\n\nQ: Use a word to define the future city?\n\nA: Spectacular.\n\nQ: Who is the right partner if you were to start a business in 2030?\n\nA: A. Someone who is competitive, ambitious, and able to deal with uncertainty.\n\nQ: Imagine you are a fashion brand CEO selecting a co-creator, from different industry, to collaborate with on a social media platform. Who is the best person?\n\nA: B. Journalist or blogger elected by the audience by voting\n\nQ: The best society in the future is one where people? A: D. Have equal income and opportunities.\n\nQ: Generate a manifesto?',
				question: 'this is a test',
			})
			.then((res) => {
				setAnswer(res.data.choices[0].text.substring(2));
				setManifesto('Ready!');
			})
			.catch((err) => console.log(err));
	};

	const saveToDB = async () => {
		axios.post(`${server}/api/firestore/answers`, {
			answers: { ...answers },
			manifesto: answer,
			createdAt: now,
		});
	};

	useEffect(() => {
		if (answer) {
			saveToDB();
		}
	}, [answer]);

	return (
		<div className='section-center'>
			<div className={styles.final}>
				<h1>{answer ? answer.substring(2) : manifesto}</h1>
				{manifesto !== 'Generate manifesto!' && manifesto !== 'Generating....' ? (
					<button onClick={(_) => router.push('/')}>Back to Home</button>
				) : (
					<button onClick={(e) => getManifesto(e)}>Go!</button>
				)}
			</div>
		</div>
	);
}
