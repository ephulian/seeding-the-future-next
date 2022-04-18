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
					<div className={homeStyles['error']}>{error}</div>
					<button className={joinButton} onClick={() => startQuestionaire()}>
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
			<div className={`${homeStyles['privacy-notice-container']} ${privacyNoticeState}`}>
				<div className={homeStyles['privacy-notice-full']}>
					<br />
					<div className={homeStyles['privacy-notice__title-container']}>
						<h3 className={homeStyles['privacy-notice__title']}>Privacy Notice</h3>
						<div onClick={() => togglePrivacyNotice()} className={homeStyles['cross']}></div>
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
