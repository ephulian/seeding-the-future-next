import QuestionOptionType from '../../components/QuestionOptionType';

export default function Q5() {
	const question5 = {
		id: 5,
		question:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eos reprehenderiteaque maiores, ipsum obcaecati iste magni laboriosam nam quae? ',
		options: [
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolore?',
			'Lorem ipsum dolor sit amet consectetur?',
			'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
			' Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolore?',
		],
		nextPage: '/questions/6',
	};

	return (
		<QuestionOptionType
			id={question5.id}
			question={question5.question}
			options={question5.options}
			nextPage={question5.nextPage}
		/>
	);
}
