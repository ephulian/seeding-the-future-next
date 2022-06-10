import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import homeStyles from '../styles/Home.module.scss';

export default function Home() {
	const [privacyNoticeState, setPrivacyNoticeState] = useState(homeStyles['closed']);
	const [joinButton, setDisabled] = useState(homeStyles['disabled']);
	const [error, setError] = useState('');

	const router = useRouter();

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
		if (joinButton === homeStyles['disabled']) {
			setError('Please accept the Privacy Notice to continue!');
		} else {
			router.push('questions/1');
		}
	};

	return (
		<>
			<section className='section-center'>
				<div className={homeStyles['home']}>
					<div className={homeStyles['card']}>
						<div className={homeStyles['logo-container']}>
							{/* <h3>logo</h3> */}
							<img
								src='https://firebasestorage.googleapis.com/v0/b/stf-db.appspot.com/o/logo.png?alt=media&token=ab5e73ec-47d8-4102-be7a-06911d50be27'
								alt='stf-logo'
							/>
						</div>
						<div className={homeStyles['title']}>
							<h1>Welcome!</h1>
							<p>
								I am a digital machine, functioning on algorithmic intelligence to bring you bespoke
								manifestos by understanding the information you provide me. Through every individual
								manifesto, a collective visual landscape is curated which you will be able to view
								and enjoy. <br />
								<br />
								Let us explore and play, future possibilities are endless.
							</p>
						</div>
					</div>
					<div className={homeStyles['button-container']}>
						<div className={homeStyles['error']}>{error}</div>
						<button className={joinButton} onClick={() => startQuestionaire()}>
							<h3>Cool, lets go!</h3>
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
				<div className={`${homeStyles['privacy-notice-container']} ${privacyNoticeState}`}>
					<div className={homeStyles['privacy-notice-full']}>
						<br />
						<div className={homeStyles['privacy-notice__title-container']}>
							<h3 className={homeStyles['privacy-notice__title']}>Privacy Notice</h3>
							<div onClick={() => togglePrivacyNotice()} className={homeStyles['cross']}></div>
						</div>
						<br />I confirm that I am aware of the nature of this project, and had an opportunity to
						ask questions about the exhibition and how my information will be used. I understand the
						purpose of the activity and what my participation involves. I agree to take part in the
						MAIM Graduate Showcase 2022 – Collective Futurithm project and for the input I provide
						to be shared with the University of the Arts London. I give permission for this platform
						to share my information for the purpose of this activity amongst the MAIM 2022 cohort.
					</div>
				</div>
			</section>
		</>
	);
}
