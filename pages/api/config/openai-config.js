// import OpenAI from 'openai-api';

// const OPENAI_API_KEY: any = process.env.OPENAI_API_KEY;

// export const openai = new OpenAI('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');

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: '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',
});

export const openai = new OpenAIApi(configuration);
