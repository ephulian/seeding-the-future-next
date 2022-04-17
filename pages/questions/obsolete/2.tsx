import QuestionInputType from '../../components/QuestionInputType';

export default function Q2() {
	const question1 = {
		id: 2,
		question: 'Lorem ipsum dolore?',
		nextPage: '/questions/3',
	};

	return (
		<QuestionInputType
			id={question1.id}
			question={question1.question}
			nextPage={question1.nextPage}
		/>
	);
}
