import React, { ChangeEvent, useState } from 'react';
import QuestionHeader from './QuestionHeader';
import QuestionStyles from '../styles/Question.module.scss';
import { useDispatch } from 'react-redux';
import { addAnswer } from '../redux/inputSlice';
import { useRouter } from 'next/router';

export default function QuestionInputType({
	id,
	question,
	nextPage,
}: {
	id: number;
	question: string;
	nextPage: string;
}) {
	const [error, setError] = useState('');
	const [answer, setAnswer] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();

	const handleNext = () => {
		answer ? router.push(nextPage) : setError('You must answer to continue!');
	};

	const handleAnswer = (e: ChangeEvent<HTMLInputElement>) => {
		setAnswer(e.currentTarget.value);
		setError('');
	};

	dispatch(addAnswer({ id: `answer_${id}`, value: answer }));

	return (
		<section className={`section-center ${QuestionStyles['question']}`}>
			<QuestionHeader count={id} />
			<div className={QuestionStyles['question-content']}>
				<div className={QuestionStyles['question-container']}>
					<h4>
						{`Q${id}`}:{' '}
						<span>
							{question}
							{/* Use a word to describe the feelings of post covid times. (positive or negative) */}
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
						name={`answer_${id}`}
						value={answer}
					/>
				</div>
				<div className={QuestionStyles['button-container']}>
					<div className={QuestionStyles['error']}>{error}</div>
					<button className={answer ? '' : 'disabled'} onClick={handleNext}>
						Next
					</button>
				</div>
			</div>
		</section>
	);
}
