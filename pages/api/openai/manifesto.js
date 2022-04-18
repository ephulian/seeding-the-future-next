import { openai } from '../config/openai-config';

const allowCors = (fn) => async (req, res) => {
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	);
	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}
	return await fn(req, res);
};

async function handler(req, res) {
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

module.exports = allowCors(handler);
