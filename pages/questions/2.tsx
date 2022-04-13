import React, { ChangeEvent, useState } from 'react';
import QuestionHeader from '../../components/QuestionHeader';
import QuestionStyles from '../../styles/Question.module.scss';
import { useDispatch } from 'react-redux';
import { addAnswer } from '../../redux/inputSlice';
import { useRouter } from 'next/router';

export default function Q2() {
	const [error, setError] = useState('');
	const [answer, setAnswer] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();

	const enableButton = () => {
		answer ? router.push('/questions/3') : setError('You must answer to continue!');
	};

	const handleAnswer = (e: ChangeEvent<HTMLInputElement>) => {
		setAnswer(e.currentTarget.value);
		setError('');
	};

	dispatch(addAnswer({ id: 'answer_2', value: answer }));

	return (
		<section className={`section-center ${QuestionStyles['question']}`}>
			<QuestionHeader count={2} />
			<div className={QuestionStyles['question-content']}>
				<div className={QuestionStyles['question-container']}>
					<h4>
						Q2:{' '}
						<span>
							Use a word to describe the feelings of post covid times. (positive or negative)
						</span>
					</h4>
				</div>
				<div className={QuestionStyles['answer-container']}>
					<input
						className={QuestionStyles['answer']}
						onChange={(e) => handleAnswer(e)}
						id='answer'
						placeholder={`Answer here...`}
						type='text'
						name='answer_2'
						value={answer}
					/>
				</div>
				<div className={QuestionStyles['button-container']}>
					<div className={QuestionStyles['error']}>{error}</div>
					<button className={answer ? '' : 'disabled'} onClick={() => enableButton()}>
						Next
					</button>
				</div>
			</div>
		</section>
	);
}
