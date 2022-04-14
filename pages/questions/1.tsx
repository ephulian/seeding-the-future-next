import QuestionInputType from '../../components/QuestionInputType';

export default function Q1() {
	const question1 = {
		id: 1,
		question: 'Use a word to describe the feelings of post covid times. (positive or negative)',
		nextPage: '/questions/2',
	};

	return (
		<QuestionInputType
			id={question1.id}
			question={question1.question}
			nextPage={question1.nextPage}
		/>
	);
}
