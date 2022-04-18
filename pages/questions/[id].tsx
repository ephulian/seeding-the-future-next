import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { server } from '../api/config';
import Question from '../../components/Question';

export default function QuestionRoute({ questions }: { questions: any }) {
	const router = useRouter();
	const { id } = router.query;
	const routeId: number = parseInt(id as string);

	let nextPage: string;

	const keys = Object.keys(questions);

	const isLast = routeId >= keys.length;
	if (isLast) {
		nextPage = '/finish';
	} else {
		nextPage = `/questions/${routeId + 1}`;
	}

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
