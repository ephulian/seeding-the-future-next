import React, { useState } from 'react';
import QuestionHeader from '../../components/QuestionHeader';
import QuestionStyles from '../../styles/Question.module.scss';
import { useDispatch } from 'react-redux';
import { addAnswer } from '../../redux/inputSlice';
import { useRouter } from 'next/router';

export default function Q4() {
	const [isAnswered, setAnswered] = useState(false);
	const [error, setError] = useState('');
	const [selectedOption, setSelectedOption] = useState('');

	const router = useRouter();
	const dispatch = useDispatch();

	const isOptionSelected = (value: string): boolean => selectedOption === value;

	const next = () => {
		isAnswered ? router.push('/questions/5') : setError('You must answer to continue!');
	};

	const handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSelectedOption(e.currentTarget.id);
		setAnswered(true);
		setError('');
		dispatch(addAnswer({ id: e.currentTarget.name, value: e.currentTarget.value }));
	};

	return (
		<section className={`section-center ${QuestionStyles['question']}`}>
			<QuestionHeader count={4} />
			<div className={QuestionStyles['question-content']}>
				<div className={QuestionStyles['question-container']}>
					<h4>
						Q4:{' '}
						<span>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eos reprehenderit
							eaque maiores, ipsum obcaecati iste magni laboriosam nam quae?
						</span>
					</h4>
				</div>
				<div className={QuestionStyles['answer-container']}>
					<div className={QuestionStyles['single-option']}>
						<input
							type='radio'
							id='option_1'
							name='answer_4'
							value='Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolore?'
							checked={isOptionSelected('option_1')}
							onChange={handleSelect}
						/>
						<label htmlFor='option_1'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolore?
						</label>
					</div>
					<div className={QuestionStyles['single-option']}>
						<input
							type='radio'
							id='option_2'
							name='answer_4'
							value='Lorem ipsum dolor sit amet consectetur??'
							checked={isOptionSelected('option_2')}
							onChange={handleSelect}
						/>
						<label htmlFor='option_2'>Lorem ipsum dolor sit amet consectetur?</label>
					</div>
					<div className={QuestionStyles['single-option']}>
						<input
							type='radio'
							id='option_3'
							name='answer_4'
							value='Lorem ipsum dolo??'
							checked={isOptionSelected('option_3')}
							onChange={handleSelect}
						/>
						<label htmlFor='option_3'>Lorem ipsum dolo?</label>
					</div>
					<div className={QuestionStyles['single-option']}>
						<input
							type='radio'
							id='option_4'
							name='answer_4'
							value='Lorem ipsum dolor sit amet consectetur adipisicing elit?'
							checked={isOptionSelected('option_4')}
							onChange={handleSelect}
						/>
						<label htmlFor='option_4'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit?
						</label>
					</div>
				</div>
				<div className={QuestionStyles['button-container']}>
					<div className={QuestionStyles['error']}>{error}</div>
					<button className={isAnswered ? '' : 'disabled'} onClick={next}>
						Next
					</button>
				</div>
			</div>
		</section>
	);
}
