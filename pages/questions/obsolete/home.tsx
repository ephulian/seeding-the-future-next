import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { openai } from '../OpenAI/OpenAi-config';
import homeStyles from '../styles/Home.module.scss';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './api/firestore';

export default function Home() {
	const [privacyNoticeState, setPrivacyNoticeState] = useState(homeStyles['closed']);
	const [joinButton, setDisabled] = useState(homeStyles['disabled']);
	const [error, setError] = useState('');
	const [questions, setQuestions] = useState<any>('');

	const questionsRef = collection(db, 'questions');

	const getQuestions = () => {
		onSnapshot(questionsRef, (snapshot) => {
			const questions = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			setQuestions(questions);
		});
	};

	console.log(questions);

	// const [answer, setAnswer] = useState('');

	// let navigate = useNavigate();
	// let dispatch = useDispatch();

	const togglePrivacyNotice = () => {
		privacyNoticeState === homeStyles['closed']
			? setPrivacyNoticeState(homeStyles['open'])
			: setPrivacyNoticeState(homeStyles['closed']);
	};

	const enableButton = () => {
		if (joinButton === homeStyles['disabled']) {
			setDisabled('');
			setError('');
		} else {
			setDisabled(homeStyles['disabled']);
		}
	};

	const startQuestionaire = () => {
		if (joinButton === 'disabled') {
			setError('Please accept the Privacy Notice to continue!');
		} else {
			// navigate('/q1');
		}
	};

	// const getAnswer = async (question) => {
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
	// 		});
	// };

	useEffect(() => {
		getQuestions();
	}, []);

	return (
		<section className='section-center'>
			<div className={homeStyles.home}>
				<div className={homeStyles.card}>
					<div className={homeStyles['logo-container']}>
						<h3>logo</h3>
					</div>
					<div className='title'>
						<h1>Seeding the Future</h1>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, saepe sint minima
							esse quae odit?
						</p>
					</div>
				</div>
				<div className={homeStyles['button-container']}>
					<div className='error'>{error}</div>
					<button className={`${joinButton}`} onClick={() => startQuestionaire()}>
						<h3>Join</h3>
					</button>
					<div className={homeStyles['privacy-notice']}>
						<input
							onChange={() => enableButton()}
							type='checkbox'
							name='privacy-policy'
							id='privacy-policy'
						/>
						<label htmlFor='privacy-policy'>
							I accept the{' '}
							<a onClick={() => togglePrivacyNotice()} href='#'>
								Privacy Notice
							</a>
						</label>
					</div>
				</div>
			</div>
			<div className={`privacy-notice-container ${privacyNoticeState}`}>
				<div className='privacy-notice-full'>
					<br />
					<div className='privacy-notice__title-container'>
						<h3 className='privacy-notice__title'>Privacy Notice</h3>
						<div onClick={() => togglePrivacyNotice()} className='cross'></div>
					</div>
					<br />
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur modi, sint assumenda
					temporibus labore id fugiat fuga, exercitationem sequi optio molestias odio dolorum porro
					amet suscipit reiciendis tempore magnam corporis autem, qui repellendus laborum cupiditate
					soluta minima. Quasi minus accusantium doloremque voluptate nihil labore asperiores sint
					voluptates ullam autem unde dicta officia porro quam, nulla enim, aut animi! Quis
					doloribus autem numquam beatae aut. Tenetur! Lorem ipsum dolor sit amet consectetur,
					adipisicing elit. Pariatur modi, sint assumenda temporibus labore id fugiat fuga,
					exercitationem sequi optio molestias odio dolorum porro amet suscipit reiciendis tempore
					magnam corporis autem, qui repellendus laborum cupiditate soluta minima. Quasi minus
					accusantium doloremque voluptate nihil labore asperiores sint voluptates ullam autem unde
					dicta officia porro quam, nulla enim, aut animi! Quis doloribus autem numquam beatae aut.
					Tenetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur modi, sint
					assumenda temporibus labore id fugiat fuga, exercitationem sequi optio molestias odio
					dolorum porro amet suscipit reiciendis tempore magnam corporis autem, qui repellendus
					laborum cupiditate soluta minima. Quasi minus accusantium doloremque voluptate nihil
					labore asperiores sint voluptates ullam autem unde dicta officia porro quam, nulla enim,
					aut animi! Quis doloribus autem numquam beatae aut. Tenetur! Lorem ipsum dolor sit amet
					consectetur, adipisicing elit. Pariatur modi, sint assumenda temporibus labore id fugiat
					fuga, exercitationem sequi optio molestias odio dolorum porro amet suscipit reiciendis
					tempore magnam corporis autem, qui repellendus laborum cupiditate soluta minima. Quasi
					minus accusantium doloremque voluptate nihil labore asperiores sint voluptates ullam autem
					unde dicta officia porro quam, nulla enim, aut animi! Quis doloribus autem numquam beatae
					aut. Tenetur!
				</div>
			</div>
		</section>
	);
}
