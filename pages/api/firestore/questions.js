import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export default async function handler(req, res) {
	const questionsRef = doc(db, 'questions', 'questions');

	const data = await getDoc(questionsRef);
	const questions = await data.data();
	// console.log(questions.data());
	// const data = {};
	// questions.forEach((doc) => {
	// 	data[doc.id] = doc.data();
	// });

	// res.status(200).json({ ...data });
	res.status(200).json({ ...questions });
}
// import { initializeApp } from 'firebase/app';
// // import { getAnalytics } from 'firebase/analytics';
// import {
// 	collection,
// 	CollectionReference,
// 	doc,
// 	getDoc,
// 	getDocs,
// 	getFirestore,
// 	onSnapshot,
// } from 'firebase/firestore';
// import { NextApiRequest, NextApiResponse } from 'next';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// type Data = {
// 	name: string;
// };
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: process.env.FIREBASE_API_KEY,
// 	authDomain: process.env.AUTH_DOMAIN,
// 	projectId: process.env.PROJECT_ID,
// 	storageBucket: process.env.STORAGE_BUCKET,
// 	messagingSenderId: process.env.MESSAGIN_SENDER_ID,
// 	appId: process.env.APP_ID,
// 	measurementId: process.env.MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// // const analytics = getAnalytics(app);

// export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
// 	const questionsRef: any = collection(db, 'questions');

// 	const questions = await getDocs(questionsRef);
//     const data = {
//         [key: string] : any
//     }
// 	questions.forEach((doc) => {
//         data[doc.id] : doc.data()
// 		console.log(doc.id, ':', doc.data());
// 	});

// 	res.status(200).json({});
// }
