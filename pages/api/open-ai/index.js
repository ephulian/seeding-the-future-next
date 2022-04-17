import { openai } from '../config/openai-config';
import axios from 'axios';

const getAnswer = async (question) => {
	return openai.complete({
		engine: 'davinci',
		prompt: question,
		maxTokens: 5,
		temperature: 0.9,
		topP: 1,
		presencePenalty: 0,
		frequencyPenalty: 0,
		bestOf: 1,
		n: 1,
		stream: false,
		stop: ['\n', 'testing'],
	});
};

export default async function handler(req, res) {
	if (req.method === 'GET') {
		res.status(200).json();
	} else if (req.method === 'POST') {
		const request = req.body.question;
		// console.log(request);
		// res.status(201).json(request);

		try {
			openai
				.createCompletion('text-davinci-002', {
					prompt: request,
					temperature: 0,
					max_tokens: 150,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
					stop: ['varfuu'],
				})
				.then((response) => {
					res.status(201).json(response.data);
					// console.log(value.data);
				});
			// const an = await answer;
			// console.log(an);
		} catch (e) {
			console.log(e);
		}
	}
}

// const getAnswer = async (question: string) => {
// 	const gptResponse = await openai
// 		.complete({
// 			engine: 'davinci',
// 			prompt: question,
// 			maxTokens: 5,
// 			temperature: 0.9,
// 			topP: 1,
// 			presencePenalty: 0,
// 			frequencyPenalty: 0,
// 			bestOf: 1,
// 			n: 1,
// 			stream: false,
// 			stop: ['\n', 'testing'],
// 		})
// 		.then((value) => {
// 			setAnswer(value);
// 			console.log(answer);
// 		});
// };
