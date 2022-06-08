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
								Hello, I am Cloudia2022. With your input, I use intelligent algorithm to create a
								personalised manifesto just for you! Have fun, because the possibilities are
								endless!
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
						<br />
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur modi, sint assumenda
						temporibus labore id fugiat fuga, exercitationem sequi optio molestias odio dolorum
						porro amet suscipit reiciendis tempore magnam corporis autem, qui repellendus laborum
						cupiditate soluta minima. Quasi minus accusantium doloremque voluptate nihil labore
						asperiores sint voluptates ullam autem unde dicta officia porro quam, nulla enim, aut
						animi! Quis doloribus autem numquam beatae aut. Tenetur! Lorem ipsum dolor sit amet
						consectetur, adipisicing elit. Pariatur modi, sint assumenda temporibus labore id fugiat
						fuga, exercitationem sequi optio molestias odio dolorum porro amet suscipit reiciendis
						tempore magnam corporis autem, qui repellendus laborum cupiditate soluta minima. Quasi
						minus accusantium doloremque voluptate nihil labore asperiores sint voluptates ullam
						autem unde dicta officia porro quam, nulla enim, aut animi! Quis doloribus autem numquam
						beatae aut. Tenetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
						modi, sint assumenda temporibus labore id fugiat fuga, exercitationem sequi optio
						molestias odio dolorum porro amet suscipit reiciendis tempore magnam corporis autem, qui
						repellendus laborum cupiditate soluta minima. Quasi minus accusantium doloremque
						voluptate nihil labore asperiores sint voluptates ullam autem unde dicta officia porro
						quam, nulla enim, aut animi! Quis doloribus autem numquam beatae aut. Tenetur! Lorem
						ipsum dolor sit amet consectetur, adipisicing elit. Pariatur modi, sint assumenda
						temporibus labore id fugiat fuga, exercitationem sequi optio molestias odio dolorum
						porro amet suscipit reiciendis tempore magnam corporis autem, qui repellendus laborum
						cupiditate soluta minima. Quasi minus accusantium doloremque voluptate nihil labore
						asperiores sint voluptates ullam autem unde dicta officia porro quam, nulla enim, aut
						animi! Quis doloribus autem numquam beatae aut. Tenetur!
					</div>
				</div>
			</section>
		</>
	);
}
