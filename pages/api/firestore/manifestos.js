// import { addDoc, collection, getDocs } from 'firebase/firestore';
// import { db } from '../config/firebase-config';

// const allowCors = (fn) => async (req, res) => {
// 	res.setHeader('Access-Control-Allow-Credentials', true);
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	// another common pattern
// 	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
// 	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
// 	);
// 	if (req.method === 'OPTIONS') {
// 		res.status(200).end();
// 		return;
// 	}
// 	return await fn(req, res);
// };

// async function handler(req, res) {
// 	const answersRef = collection(db, 'answers');

// 	if (req.method === 'GET') {

//         try {
//             const docs = await getDocs(answersRef)
//         }
// 		try {
// 			console.log(data);
// 			addDoc(answersRef, {
// 				...data,
// 			});
// 			res.status(200).json({ data });
// 		} catch (e) {
// 			console.log(e);
// 			res.status(500).json({ error: 'Internal server error!' });
// 		}
// 	}
// }

// export default allowCors(handler);
