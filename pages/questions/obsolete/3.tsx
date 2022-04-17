import QuestionInputType from '../../components/QuestionInputType';

export default function Q2() {
	const question1 = {
		id: 3,
		question: 'Lorem ipsum dolore isem cols girant?',
		nextPage: '/questions/4',
	};

	return (
		<QuestionInputType
			id={question1.id}
			question={question1.question}
			nextPage={question1.nextPage}
		/>
	);
}
