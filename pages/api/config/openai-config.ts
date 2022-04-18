import { Configuration, OpenAIApi } from 'openai';

const openaiConfig = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

console.log(process.env.OPENAI_API_KEY);

export const openai = new OpenAIApi(openaiConfig);
