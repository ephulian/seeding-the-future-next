import React, { useEffect, useRef } from 'react';
import animStyles from '../styles/Animations.module.scss';

export default function Animation({ words }) {
	const text1 = useRef();
	const text2 = useRef();

	let id;

	const animation = (keywords) => {
		if (text1.current !== undefined && text2.current !== undefined) {
			// const texts = ['If', 'You', 'Like', 'It', 'Please', 'Give', 'a Love', ':)', 'by @DotOnion'];
			const texts = keywords;
			const morphTime = 2;
			const cooldownTime = 0.25;

			let textIndex = texts.length - 1;
			let time = new Date();
			let morph = 10;
			let cooldown = cooldownTime;

			text1.textContent = texts[textIndex % texts.length];
			text2.textContent = texts[(textIndex + 1) % texts.length];

			function doMorph() {
				morph -= cooldown;
				cooldown = 0;
				let fraction = morph / morphTime;
				if (fraction > 1) {
					cooldown = cooldownTime;
					fraction = 1;
				}
				setMorph(fraction);
			}

			function setMorph(fraction) {
				text2.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
				text2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
				fraction = 1 - fraction;
				text1.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
				text1.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
				text1.current.textContent = texts[textIndex % texts.length];
				text2.current.textContent = texts[(textIndex + 1) % texts.length];
			}

			function doCooldown() {
				morph = 0;
				text2.current.style.filter = '';
				text2.current.style.opacity = '100%';
				text1.current.style.filter = '';
				text1.current.style.opacity = '0%';
			}

			function animate() {
				id = requestAnimationFrame(animate);
				let newTime = new Date();
				let shouldIncrementIndex = cooldown > 0;
				let dt = (newTime - time) / 1000;
				time = newTime;
				cooldown -= dt;
				if (cooldown <= 0) {
					if (shouldIncrementIndex) {
						textIndex++;
					}
					doMorph();
				} else {
					doCooldown();
				}
			}

			animate();
		}
	};

	const stop = () => {
		cancelAnimationFrame(id);
	};

	const start = () => {
		animation(words, 'start');
	};

	useEffect(() => {
		setTimeout(() => {
			start();
		}, 1500);

		return () => {
			stop();
		};
	}, []);

	return (
		<div className={animStyles['anim-container']}>
			<div className={animStyles['anim']} id='container'>
				<span ref={text1} className={animStyles['text1']} id='text1'></span>
				<span ref={text2} className={animStyles['text2']} id='text2'></span>
			</div>

			<svg className={animStyles['filters']} id='filters'>
				<defs>
					<filter className={animStyles['threshold']} id='threshold'>
						<feColorMatrix
							in='SourceGraphic'
							type='matrix'
							values='1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140'
						/>
					</filter>
				</defs>
			</svg>
		</div>
	);
}
