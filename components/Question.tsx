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
	const [error, setError] = useState(' ');
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
		setError('');
		setAnswered(true);
		console.log(isAnswered);
		isAnswered ? router.push(nextPage) : setError('You must answer to continue!');
	};

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.currentTarget.value.split(' ').length > 1) {
			console.log('too long');
			setError('Please use only a single word!');
			setAnswer(e.currentTarget.value);
			setAnswered(false);
		} else {
			setAnswer(e.currentTarget.value);
			e.currentTarget.value ? setAnswered(true) : setAnswered(false);
			setError('');
		}
		// options ?
	};

	const OptionType = ({ oid, option }: { oid: any; option: any }) => {
		return (
			<div
				className={`${QuestionStyles['single-option']} ${
					isOptionSelected(`option_${oid}`) ? QuestionStyles['option-selected'] : ''
				}`}
			>
				<input
					type='radio'
					id={`option_${oid}`}
					name={`answer_${id}`}
					value={option}
					// className={}
					checked={isOptionSelected(`option_${oid}`)}
					onChange={handleSelect}
				/>
				<label className={QuestionStyles['option-label']} htmlFor={`option_${oid}`}>
					{option}
				</label>
			</div>
		);
	};

	const InputType = (
		<input
			className={QuestionStyles['answer']}
			style={{ borderBottom: isAnswered ? `2px solid #2893d8` : `2px solid #e4e4e4` }}
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
		options ? setAnswered(true) : setAnswered(false);
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
						<span style={{ fontWeight: '600' }}>{question}</span>
					</h4>
				</div>
				<div
					style={{
						background: options ? 'none' : 'white',
						height: options ? '300px' : '225px',
						padding: options ? '0' : '2rem',
					}}
					className={QuestionStyles['answer-card']}
				>
					<div className={QuestionStyles['answer-container']}>
						{options
							? options.map((option, key) => <OptionType oid={key} key={key} option={option} />)
							: InputType}
					</div>
					{/* <mask id='circle'>
						<circle fill='white' cx='100' cy='100' r='100'></circle>
						<circle fill='black' cx='86%' cy='86%' r='18'></circle>
					</mask> */}
					<div className={QuestionStyles['button-container']}>
						<div className={QuestionStyles['error']}>{error}</div>
						<button
							style={{ display: options ? 'none' : 'block' }}
							className={isAnswered ? '' : 'disabled'}
							onClick={next}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
