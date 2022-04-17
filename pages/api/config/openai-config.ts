import OpenAI from 'openai-api';

const OPENAI_API_KEY: any = process.env.OPENAI_API_KEY;

export const openai = new OpenAI(OPENAI_API_KEY);
