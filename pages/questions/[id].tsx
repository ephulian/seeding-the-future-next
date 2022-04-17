import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { server } from '../api/config';
import Question from '../../components/Question';
import { useEffect, useState } from 'react';

export default function QuestionRoute({ questions }: { questions: any }) {
	const [state, setState] = useState(questions);
	// const [nextPage, setNextPage] = useState('');
	const router = useRouter();
	const { id } = router.query;
	const routeId = parseInt(id);

	const store = useSelector((store) => store);
	// console.log(store.userInput.answers);
	let nextPage: string;

	const keys = Object.keys(questions);
	// console.log(keys.length);

	const isLast = routeId >= keys.length;
	if (isLast) {
		nextPage = '/finish';
	} else {
		nextPage = `/questions/${routeId + 1}`;
	}

	useEffect(() => {
		setState(questions);
	}, [questions]);

	return (
		<>
			<Question
				id={routeId}
				question={questions[`question_${routeId}`].question}
				nextPage={nextPage}
				options={questions[`question_${routeId}`].options}
			/>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const res = await fetch(`${server}/api/firestore/questions`);

	const questions = await res.json();

	return {
		props: {
			questions,
		},
	};
};
