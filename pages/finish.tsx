import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '../redux/inputSlice';

export default function Finish() {
	const router = useRouter();
	const dispatch = useDispatch();

	const now = Date.now();

	dispatch(addDate(now));

	const store = useSelector((state) => state);
	console.log(store);

	return (
		<div className='section-center'>
			<h1>Submited!</h1>
			<button onClick={() => router.push('/')}>Back to beginning</button>
		</div>
	);
}
