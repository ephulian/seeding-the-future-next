import QuestionOptionType from '../../components/QuestionOptionType';

export default function Q4() {
	const question4 = {
		id: 4,
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

	return (
		<QuestionOptionType
			id={question4.id}
			question={question4.question}
			options={question4.options}
			nextPage={question4.nextPage}
		/>
	);
}
