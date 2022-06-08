import axios from 'axios';
import { useRouter } from 'next/router';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '../redux/inputSlice';
import { server } from './api/config';
import styles from '../styles/Final.module.scss';
import QuestionHeader from '../components/QuestionHeader';
import Animation from '../components/Animation';

export default function Finish() {
	const [answer, setAnswer] = useState();
	const [manifesto, setManifesto] = useState('Generate your unique future manifesto!');
	const [keywords, setKeywords] = useState([]);
	const [displayKeywords, setDisplayKeywords] = useState('');
	const [running, setRunning] = useState(false);
	const [NFT, setNFT] = useState('No');

	const dispatch = useDispatch();
	const router = useRouter();

	const modal = useRef();

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
			NFT: NFT,
		});
	};

	const saveNFT = async (e) => {
		e.preventDefault();
		axios.post(`${server}/api/firestore/nft`, {
			manifesto: answer,
			nft: NFT,
		});
	};

	const getManifesto = async (e) => {
		e.preventDefault();
		setManifesto('Generating....');

		const word4 = getRandomKeyword(answers[4], 4);
		const word5 = getRandomKeyword(answers[5], 5);
		const word6 = getRandomKeyword(answers[6], 6);

		setKeywords([word4, word5, word6]);
		setDisplayKeywords([answers[1].A, answers[2].A, answers[3].A, word4, word5, word6]);

		axios
			.post(`${server}/api/openai/manifesto`, {
				question: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: Make a sentence with ${answers[1].A}, ${answers[2].A}, ${answers[3].A}, ${word4}, ${word5} and ${word6}\nMarv: `,
			})
			.then((res) => {
				setAnswer(res.data.choices[0].text);
				setManifesto('Ready!');
			})
			.catch((err) => console.log(err));
	};

	const accept = (e) => {
		setNFT('Yes');
		modal.current.close();
		saveNFT(e);
	};

	const decline = (e) => {
		setNFT('No');
		modal.current.close();
		saveNFT(e);
	};

	console.log('NFT:', NFT);

	useEffect(() => {
		if (manifesto === 'Ready!') {
			saveToDB();
			setRunning(true);
		}
	}, [manifesto]);

	return (
		<div className='section-center'>
			<QuestionHeader count={0} />
			<div className={styles.final}>
				<div className={styles['final-container']}>
					{/* <Anim /> */}
					{/* {manifesto === 'Ready!' ? <Anim /> : ''} */}
					{running ? <Animation words={displayKeywords} /> : null}
					<h4>{answer ? `"${answer.substring(2)}"` : `${manifesto}`}</h4>
					<dialog ref={modal}>
						<div className={styles['modal-card-container']}>
							<div className={styles['modal-card']}>
								<h3>Cloudia 2022 NFT Club</h3>
								<p>
									We are inviting you to participate in our NFT project! By pressing ‘YES’ means you
									allow your personalized manifesto to be minted as a unique NFT on POAP*. Feel free
									to collect your own NFT and create a blockchain wallet today at our service desk.
									*POAP is a gift from an issuer to collectors APP, in celebration of a special
									shared memory.By minting these memories to the blockchain, collectors build a rich
									tapestry of tokenized experiences which unlock a world of possibilities.
								</p>
								<div className={styles['buttons-container']}>
									<button onClick={(e) => accept(e)}>Yes</button>
									<button style={{ background: 'rgb(77, 77, 77)' }} onClick={(e) => decline(e)}>
										Decline
									</button>
								</div>
							</div>
						</div>
					</dialog>
					{manifesto !== 'Generate your unique future manifesto!' &&
					manifesto !== 'Generating....' ? (
						<button
							style={{ marginTop: '-25px' }}
							onClick={(_) => {
								modal.current.showModal();
							}}
						>
							Join NFT
						</button>
					) : (
						// <button style={{ marginTop: '-25px' }} onClick={(_) => router.push('/')}>
						// 	Back to Home
						// </button>
						<button onClick={(e) => getManifesto(e)}>Go!</button>
					)}
				</div>
			</div>
		</div>
	);
}
