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

	const rui = ['concrete', 'business', 'product design', 'service', 'enterprise'];
	const lee = [
		'symbiosis with tech',
		'brand positioning',
		'customer culture',
		'value diversity',
		'storytelling',
	];
	const jenna = [
		'future retail',
		'customer experience',
		'technology integration',
		'innovation strategy',
		'retail physical format',
	];
	const joyce = [
		'foresight',
		'entrepreneurial resilience',
		'scenario thinking',
		'creators',
		'algorithm',
	];
	const erini = ['sustainability', 'ethical fashion', 'value crisis', 'heritage', 'clean luxury'];
	const helen = ['fashion', 'luxury retail', 'hiring', 'human resource', 'organization'];
	const liang = [
		'chinoiserie',
		'sustainable fashion',
		'traditional culture',
		'brand competencies',
		'brand strategy',
	];
	const winnie = [
		'electronics',
		'special education',
		'innovation method',
		'technology',
		'social policy',
	];
	const lotti = [
		'fintech',
		'marketing strategy',
		'digitalisation',
		'financial literacy',
		'fintech marketing strategy',
	];
	const li = [
		'experience thinking',
		'customer loyalty',
		'brand competitiveness',
		'digital future',
		'new retail',
	];
	const purv = ['foresight', 'regenartive design', 'systems change', 'future city', 'biomimicry'];
	const lila = [
		'system change',
		'subtractive future',
		'ecological justice',
		'sustainable fashion',
		'paradigm shift',
	];
	const jiamin = [
		'second-hand',
		'luxury',
		'consumer motivation',
		'conterfeit problem',
		'NFT blockchain',
	];

	const _4A = lotti.concat(purv, jenna, lila);
	const _4B = rui.concat(lila);
	const _4C = joyce.concat(helen, winnie, jiamin);
	const _4D = lee.concat(erini, li);

	const _5A = erini.concat(liang);
	const _5B = lila.concat(helen, jenna, lotti, winnie);
	const _5C = joyce.concat(jiamin, lila);
	const _5D = purv.concat(li);

	const _6A = jiamin.concat(jenna);
	const _6B = rui.concat(liang, li);
	const _6C = joyce.concat(erini, lila, helen);
	const _6D = lila.concat(lotti, lee, purv, winnie);

	// console.log(answers);
	// console.log(_4A);

	const getRandom = (array: Array<String>) => {
		const random = Math.floor(Math.random() * array.length);
		return array[random];
	};

	const getRandomKeyword = (picked: any, question: Number) => {
		switch (question) {
			case 4:
				switch (picked.A[0]) {
					case 'A':
						return getRandom(_4A);
					case 'B':
						return getRandom(_4B);
					case 'C':
						return getRandom(_4C);
					case 'D':
						return getRandom(_4D);
				}
			case 5:
				switch (picked.A[0]) {
					case 'A':
						return getRandom(_5A);
					case 'B':
						return getRandom(_5B);
					case 'C':
						return getRandom(_5C);
					case 'D':
						return getRandom(_5D);
				}
			case 6:
				switch (picked.A[0]) {
					case 'A':
						return getRandom(_6A);
					case 'B':
						return getRandom(_6B);
					case 'C':
						return getRandom(_6C);
					case 'D':
						return getRandom(_6D);
				}
		}
	};

	const saveToDB = async () => {
		axios.post(`${server}/api/firestore/answers`, {
			answers: { ...answers },
			manifesto: answer,
			createdAt: now,
		});
	};

	const getManifesto = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setManifesto('Generating....');
		axios
			.post(`${server}/api/openai/manifesto`, {
				question: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: Make a sentence with ${
					answers[1].A
				}, ${answers[2].A}, ${answers[3].A}, ${getRandomKeyword(answers[4], 4)}, ${getRandomKeyword(
					answers[5],
					5
				)} and ${getRandomKeyword(answers[6], 6)}\nMarv: `,
			})
			.then((res) => {
				setAnswer(res.data.choices[0].text);
				setManifesto('Ready!');
				// saveToDB();
			})
			.catch((err) => console.log(err));
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
