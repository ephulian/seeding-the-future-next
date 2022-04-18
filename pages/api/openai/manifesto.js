import { openai } from '../config/openai-config';

export default async function handler(req, res) {
	// if (req.method === 'GET') {
	// 	res.status(200).json();
	// } else
	if (req.method === 'POST') {
		const request = req.body.question;

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
				console.log(response.data);
				res.status(200).json(response.data);
			})
			.catch((e) => {
				console.log('current error: ', e);
			});
	}
}
