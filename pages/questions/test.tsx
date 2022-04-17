import Question from '../../components/Question';

export default function Q1() {
	const question1 = {
		id: 1,
		question: 'Use a word to describe the feelings of post covid times. (positive or negative)',
		nextPage: '/questions/2',
	};

	const question2 = {
		id: 2,
		question:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eos reprehenderiteaque maiores, ipsum obcaecati iste magni laboriosam nam quae? ',
		options: [
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolore?',
			'Lorem ipsum dolor sit amet consectetur?',
			'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
			' Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolore?',
		],
		nextPage: '/questions/5',
	};

	const one = false;

	return one ? (
		<Question id={question1.id} question={question1.question} nextPage={question1.nextPage} />
	) : (
		<Question
			id={question2.id}
			question={question2.question}
			options={question2.options}
			nextPage={question2.nextPage}
		/>
	);
}
