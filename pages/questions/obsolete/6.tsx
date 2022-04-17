import QuestionOptionType from '../../components/QuestionOptionType';

export default function Q6() {
	const question6 = {
		id: 6,
		question:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eos reprehenderiteaque maiores, ipsum obcaecati iste magni laboriosam nam quae? ',
		options: [
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolore?',
			'Lorem ipsum dolor sit amet consectetur?',
			'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
			' Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolore?',
		],
		nextPage: '/finish',
	};

	return (
		<QuestionOptionType
			id={question6.id}
			question={question6.question}
			options={question6.options}
			nextPage={question6.nextPage}
		/>
	);
}
