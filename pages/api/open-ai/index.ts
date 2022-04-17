// const dev = process.env.NODE_ENV !== 'production';

// export const server = dev ? 'http://localhost:3000' : 'https"//yourwebsite.com';

import OpenAI from 'openai-api';

const OPENAI_API_KEY: any = process.env.OPENAI_API_KEY;

console.log(OPENAI_API_KEY);

export const openai = new OpenAI(OPENAI_API_KEY);
