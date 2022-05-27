import { useRouter } from 'next/router';
import React from 'react';
import QuestionHeaderStyles from '../styles/QuestionHeader.module.scss';

export default function QuestionHeader({ count }: { count: number }) {
	const router = useRouter();

	return (
		<header className={QuestionHeaderStyles['question-header']}>
			<div className={QuestionHeaderStyles['logo-container']}>
				<div
					onClick={() => router.push(count - 1 > 0 ? `/questions/${count - 1}` : '/')}
					className={`${QuestionHeaderStyles['arrow']} ${QuestionHeaderStyles['left']}`}
				></div>
				<img
					onClick={() => router.push('/')}
					src='https://firebasestorage.googleapis.com/v0/b/stf-db.appspot.com/o/logo.png?alt=media&token=ab5e73ec-47d8-4102-be7a-06911d50be27'
					alt='stf-logo'
				/>
				<div
					onClick={() => router.push(count + 1 <= 6 ? `/questions/${count + 1}` : '/finish')}
					className={`${QuestionHeaderStyles['arrow']} ${QuestionHeaderStyles['right']}`}
				></div>
			</div>
			<div className={QuestionHeaderStyles['title']}>
				{/* <h4>Seeding the Future </h4> */}
				<h4>QUESTION {count} OF 6</h4>
			</div>
		</header>
	);
}
