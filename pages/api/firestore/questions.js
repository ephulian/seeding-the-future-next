import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export default async function handler(req, res) {
	const questionsRef = doc(db, 'questions', 'questions');

	const data = await getDoc(questionsRef);
	const questions = await data.data();

	res.status(200).json({ ...questions });
}
