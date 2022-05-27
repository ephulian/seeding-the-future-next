import React, { ChangeEvent, useEffect, useState } from 'react';
import QuestionHeader from './QuestionHeader';
import QuestionStyles from '../styles/Question.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswer } from '../redux/inputSlice';
import { useRouter } from 'next/router';

export default function Question({
	id,
	question,
	nextPage,
	options,
}: {
	id: number;
	question: string;
	options?: string[];
	nextPage: string;
}) {
	const [isAnswered, setAnswered] = useState(false);
	const [error, setError] = useState('');
	const [selectedOption, setSelectedOption] = useState('');
	const [answer, setAnswer] = useState('');

	const router = useRouter();
	const dispatch = useDispatch();

	const isOptionSelected = (value: string): boolean => selectedOption === value;

	const next = () => {
		isAnswered ? router.push(nextPage) : setError('You must answer to continue!');
	};

	const dispatchData = () => {
		dispatch(
			addAnswer({
				id: id,
				value: { Q: question, A: answer },
			})
		);
	};

	const handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSelectedOption(e.currentTarget.id);
		setAnswer(e.currentTarget.value);
		setAnswered(true);
		setError('');
	};

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setAnswer(e.currentTarget.value);
		setAnswered(true);
		setError('');
	};

	const OptionType = ({ oid, option }: { oid: any; option: any }) => {
		return (
			<div className={QuestionStyles['single-option']}>
				<input
					type='radio'
					id={`option_${oid}`}
					name={`answer_${id}`}
					value={option}
					checked={isOptionSelected(`option_${oid}`)}
					onChange={handleSelect}
				/>
				<label htmlFor={`option_${oid}`}>{option}</label>
			</div>
		);
	};

	const InputType = (
		<input
			className={QuestionStyles['answer']}
			onChange={(e) => handleInput(e)}
			id='answer'
			placeholder={`Answer here...`}
			type='text'
			name={`answer_${id}`}
			value={answer}
		/>
	);

	useEffect(() => {
		setAnswer('');
		setSelectedOption('');
		setAnswered(false);
	}, [id]);

	useEffect(() => {
		dispatchData();
	}, [answer]);

	return (
		<section className={`section-center ${QuestionStyles['question-content']}`}>
			<QuestionHeader count={id} />
			<div className={QuestionStyles['question']}>
				<div className={QuestionStyles['question-container']}>
					<h4>
						{/* {`Q${id}`}: <span>{question}</span> */}
						<span>{question}</span>
					</h4>
				</div>
				<div className={QuestionStyles['answer-card']}>
					<div className={QuestionStyles['answer-container']}>
						{options
							? options.map((option, key) => <OptionType oid={key} key={key} option={option} />)
							: InputType}
					</div>
					<mask id='circle'>
						<circle fill='white' cx='100' cy='100' r='100'></circle>
						<circle fill='black' cx='86%' cy='86%' r='18'></circle>
					</mask>
					<div className={QuestionStyles['button-container']}>
						<div className={QuestionStyles['error']}>{error}</div>
						<button className={isAnswered ? '' : 'disabled'} onClick={next}>
							Next
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
