import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '../redux/inputSlice';
import { server } from './api/config';
import styles from '../styles/Final.module.scss';
import QuestionHeader from '../components/QuestionHeader';

export default function Finish() {
	const [answer, setAnswer] = useState();
	const [manifesto, setManifesto] = useState('Generate your unique future manifesto!');
	const [keywords, setKeywords] = useState([]);
	const [displayKeywords, setDisplayKeywords] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();

	const now = Date.now();

	dispatch(addDate(now));

	const store = useSelector((state) => state);
	const answers = store.userInput.answers;

	const rui = ['concrete', 'business', 'office', 'service', 'enterprise'];
	const lee = ['symbiosis', 'branding', 'culture', 'value', 'storytelling'];
	const jenna = ['retail', 'technology', 'enterprise', 'behaviour'];
	const joyce = ['foresight', 'entrepreneur', 'scenario', 'creators', 'participation'];
	const erini = ['sustainability', 'value', 'heritage', 'luxury'];
	const helen = ['fashion', 'hiring', 'recruitment', 'organization'];
	const liang = ['traditional', 'culture'];
	const winnie = ['electronics', 'education', 'ethics', 'specialised'];
	const lotti = ['fintech', 'marketing', 'digitalisation', 'financial', 'strategy'];
	const li = ['experience', 'loyalty', 'brand', 'digital'];
	const purv = ['foresight', 'regenartive', 'complexity', 'future', 'biomimicry'];
	const lila = ['system', 'restorative', 'postgrowth', 'paradigm'];
	const jiamin = ['second-hand', 'motivation', 'conterfeit', 'blockchain'];

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

	const getRandom = (array) => {
		const random = Math.floor(Math.random() * array.length);
		return array[random];
	};

	const getRandomKeyword = (picked, question) => {
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
			keywords: keywords,
		});
	};

	const getManifesto = async (e) => {
		e.preventDefault();
		setManifesto('Generating....');

		const word4 = getRandomKeyword(answers[4], 4);
		const word5 = getRandomKeyword(answers[5], 5);
		const word6 = getRandomKeyword(answers[6], 6);

		setKeywords([word4, word5, word6]);
		setDisplayKeywords(
			<div>
				<h4 style={{ border: 'none', fontWeight: '600' }}>Keywords:</h4>
				<p>
					{answers[1].A}, {answers[2].A}, {answers[3].A}, {word4}, {word5},{word6}
				</p>
			</div>
		);

		axios
			.post(`${server}/api/openai/manifesto`, {
				question: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: Make a sentence with ${answers[1].A}, ${answers[2].A}, ${answers[3].A}, ${word4}, ${word5} and ${word6}\nMarv: `,
			})
			.then((res) => {
				setAnswer(res.data.choices[0].text);
				setManifesto('Ready!');

				// saveToDB();
			})
			.catch((err) => console.log(err));
	};

	// const foo = () => {
	// 	var tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
	// 	tl.set('.word.in, .word.too, .word.deep', { opacity: 0 });

	// 	const bgColor = 'hsl(190, 100%, 75%)';

	// 	// Lines
	// 	tl.fromTo(
	// 		'.bottom-side',
	// 		{
	// 			width: 0,
	// 			background: bgColor,
	// 			immediateRender: false,
	// 			autoRound: false,
	// 		},
	// 		{
	// 			duration: 1.7,
	// 			width: '100%',
	// 			background: bgColor,
	// 		}
	// 	);
	// 	tl.fromTo(
	// 		'.left-side',
	// 		{
	// 			height: 0,
	// 			background: bgColor,
	// 			immediateRender: false,
	// 			autoRound: false,
	// 		},
	// 		{
	// 			duration: 1.7,
	// 			height: '100%',
	// 			background: bgColor,
	// 			delay: -1.7,
	// 		}
	// 	);

	// 	// TOO
	// 	tl.fromTo('.text1 .word.in', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: 0.6 });
	// 	tl.fromTo('.text2 .word.in', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.3 });
	// 	tl.fromTo('.text3 .word.in', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text4 .word.in', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text5 .word.in', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text6 .word.in', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text7 .word.in', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });

	// 	// TOO
	// 	tl.fromTo('.text1 .word.too', { opacity: 0 }, { duration: 0.5, opacity: 1 });
	// 	tl.fromTo('.text2 .word.too', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.3 });
	// 	tl.fromTo('.text3 .word.too', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text4 .word.too', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text5 .word.too', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text6 .word.too', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text7 .word.too', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });

	// 	// DEEP

	// 	tl.fromTo('.text1 .word.deep', { opacity: 0 }, { duration: 0.5, opacity: 1 });

	// 	tl.fromTo('.text2 .word.deep', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.3 });
	// 	tl.fromTo('.text3 .word.deep', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text4 .word.deep', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text5 .word.deep', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text6 .word.deep', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });
	// 	tl.fromTo('.text7 .word.deep', { opacity: 0 }, { duration: 1.3, opacity: 1, delay: -1.2 });

	// 	// Rotate
	// 	tl.to('.text', 1, { transform: 'rotate(-20deg) skew(0deg, 0deg)', delay: 0.5 });

	// 	// Fade Out
	// 	tl.to('.text1, .text2', 0.6, { opacity: 0, delay: 1.2 });
	// 	tl.to('.text3', 0.6, { opacity: 0, delay: -0.5 });
	// 	tl.to('.text4', 0.6, { opacity: 0, delay: -0.5 });
	// 	tl.to('.text5', 0.6, { opacity: 0, delay: -0.5 });
	// 	tl.to('.text6', 0.6, { opacity: 0, delay: -0.5 });
	// 	tl.to('.text7', 0.6, { opacity: 0, delay: -0.5 });
	// };

	useEffect(() => {
		if (manifesto === 'Ready!') {
			saveToDB();
		}
	}, [manifesto]);

	// useEffect(() => {
	// 	if (answer) {
	// 		saveToDB();
	// 	}
	// }, [answer]);

	const arr = [1, 2, 3, 4, 5, 6, 7];

	return (
		<div className='section-center'>
			<QuestionHeader count={0} />
			<div className={styles.final}>
				<div className={styles['final-container']}>
					{/* {answer ? <h2>Your unique future manifesto is ready!</h2> : ''} */}
					{/* <div className={styles['anim']}>
						<div className='anim-1'>
							<div className='container'>
								{arr.map((el, index) => {
									return (
										<div key={index} className={`text text${el}`}>
											<p className='word in'>IN</p>
											<p className='word too'>TOO</p>
											<p className='word deep'>DEEP</p>
										</div>
									);
								})}
							</div>
						</div>
						<div className='anim-2'>
							<div className='container'>
								{arr.map((el, index) => {
									return (
										<div key={index} className={`text text${el}`}>
											<p className='word in'>IN</p>
											<p className='word too'>TOO</p>
											<p className='word deep'>DEEP</p>
											<span className='left-side'></span>
											<span className='bottom-side'></span>
										</div>
									);
								})}
							</div>
						</div>
						<span className='left-side'></span>
						<span className='bottom-side'></span>
					</div> 
			// <style>
			// 	{`

			// 			:root {
			// 			--dark-purple: hsl(285, 86%, 4%);
			// 			--neon-blue: hsl(190, 100%, 75%);
			// 			--neon-pink: hsl(303, 100%, 73%);
			// 			--size: 5;
			// 			--unit: calc((var(--size) / 100) * 1vmin);
			// 			}

			// 			@font-face {
			// 				font-family: 'Public Sans Roman';
			// 				src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/PublicSans-Roman-VF.ttf');
			// 			}

			// 			.container {
			// 				border: 2px solid red;
			// 				position: relative;
			// 				background-color: black;
			// 				margin-top: 2rem;
			// 				height: 175px;
			// 				width: 250px;
			// 			}

			// 			.text {
			// 			text-align: start;
			// 			position: absolute;
			// 			transform: rotate(-45deg) skew(15deg, 15deg);
			// 			left: 25%;
			// 			top: 50%;
			// 			width: calc(500 * var(--unit));
			// 			height: calc(600 * var(--unit));
			// 			font-size: calc(160 * var(--unit));
			// 			font-weight: 200;
			// 			-webkit-text-fill-color: #ffffff00;
			// 			-webkit-text-stroke-width: 4px;
			// 			-webkit-text-stroke-color: var(--neon-pink);
			// 			line-height: calc(160 * var(--unit));
			// 			padding: calc(60 * var(--unit));
			// 			}

			// 			.left-side,
			// 			.bottom-side {
			// 			position: absolute;
			// 			background: none transparent;
			// 			width: 0px;
			// 			height: 0px;
			// 			}

			// 			.left-side {
			// 			left: 0;
			// 			bottom: 0;
			// 			height: calc(200 * var(--unit));
			// 			width: calc(5 * var(--unit));
			// 			}

			// 			.bottom-side {
			// 			bottom: 0;
			// 			left: 0;
			// 			width: calc(200 * var(--unit));
			// 			height: calc(5 * var(--unit));
			// 			}

			// 			.text1 {
			// 			top: 0px;
			// 			-webkit-text-fill-color: transparent;
			// 			filter: blur(0.5px);
			// 			background-blend-mode: screen;
			// 			}

			// 			.text2 {
			// 			top: calc(1 * var(--unit));
			// 			background-blend-mode: screen;
			// 			filter: blur(0.1px);
			// 			}

			// 			.text3 {
			// 			top: calc(2 * var(--unit));
			// 			opacity: 1;
			// 			filter: blur(0.25px);
			// 			}

			// 			.text4 {
			// 			top: calc(3 * var(--unit));
			// 			opacity: 0.8;
			// 			filter: blur(0.5px);
			// 			}

			// 			.text5 {
			// 			top: calc(4 * var(--unit));
			// 			opacity: 0.6;
			// 			filter: blur(0.75px);
			// 			}

			// 			.text6 {
			// 			top: calc(5 * var(--unit));
			// 			opacity: 0.4;
			// 			filter: blur(1px);
			// 			}

			// 			.text7 {
			// 			top: calc(6 * var(--unit));
			// 			opacity: 0.2;
			// 			filter: blur(1.2px);
			// 			}

			// 			.word.in,
			// 			.word.too,
			// 			.word.deep {
			// 			opacity: 0;
			// 			}
			// 			`} 
			// </style> */}

					{/* {`${answers[1].A}, ${answers[2].A}, ${answers[3].A}, ${keywords[0]}, ${keywords[1]}, ${keywords[2]}`} */}
					{displayKeywords}
					<h4>{answer ? `"${answer.substring(2)}"` : `${manifesto}`}</h4>
					{manifesto !== 'Generate your unique future manifesto!' &&
					manifesto !== 'Generating....' ? (
						<button onClick={(_) => router.push('/')}>Back to Home</button>
					) : (
						<button onClick={(e) => getManifesto(e)}>Go!</button>
					)}
				</div>
			</div>
		</div>
	);
}
