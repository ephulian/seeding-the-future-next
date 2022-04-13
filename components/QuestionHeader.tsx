import { useRouter } from 'next/router';
import React from 'react';
import QuestionHeaderStyles from '../styles/QuestionHeader.module.scss';

export default function QuestionHeader({ count }: { count: number }) {
	const router = useRouter();

	return (
		<header className={QuestionHeaderStyles['question-header']}>
			<div onClick={() => router.push('/')} className={QuestionHeaderStyles['logo-container']}>
				<h5>logo</h5>
			</div>
			<div className={QuestionHeaderStyles['title']}>
				<h4>Seeding the Future </h4>
				<h4>{count}/6</h4>
			</div>
		</header>
	);
}
