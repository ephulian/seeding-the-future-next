import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export default async function handler(req, res) {
	const answersRef = collection(db, 'answers');

	if (req.method === 'POST') {
		const data = req.body;

		try {
			console.log(data);
			addDoc(answersRef, {
				...data,
			});
			res.status(200).json({ data });
		} catch (e) {
			console.log(e);
			res.status(500).json({ error: 'Internal server error!' });
		}
	}
}
