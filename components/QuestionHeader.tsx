import { useRouter } from 'next/router';
import React, { useState } from 'react';
import QuestionHeaderStyles from '../styles/QuestionHeader.module.scss';

export default function QuestionHeader({ count }: { count: number }) {
	const router = useRouter();
	const [show, setShow] = useState();

	return (
		<header className={QuestionHeaderStyles['question-header']}>
			<div className={QuestionHeaderStyles['logo-container']}>
				<div
					style={{ display: count ? 'block' : 'none' }}
					onClick={() => router.push(count - 1 > 0 ? `/questions/${count - 1}` : '/')}
					className={`${QuestionHeaderStyles['arrow']} ${QuestionHeaderStyles['left']}`}
				></div>
				<img
					onClick={() => router.push('/')}
					src='https://firebasestorage.googleapis.com/v0/b/cloudia-ai.appspot.com/o/logo.png?alt=media&token=6eaf6e62-6fa9-426e-a5ca-1531b98cbf4e'
					alt='stf-logo'
				/>
				<div
					// style={{ display: count === 6 ? 'none' : 'block' }}
					onClick={() => router.push(count + 1 <= 6 ? `/questions/${count + 1}` : '/finish')}
					className={`${QuestionHeaderStyles['empty']} ${QuestionHeaderStyles['right']}`}
				></div>
			</div>
			<div className={QuestionHeaderStyles['title']}>
				{/* <h4>Seeding the Future </h4> */}
				{count ? <h4>QUESTION {count} OF 6</h4> : ''}
			</div>
		</header>
	);
}
