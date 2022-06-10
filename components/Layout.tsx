// import styles from '../styles/Layout.module.css';
// import { Header } from './Header';
// import Meta from './Meta';

import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { use100vh } from 'react-div-100vh';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const height = use100vh();

	return (
		<>
			{/* <Meta /> */}
			<Head>
				<title>Cloudia</title>
				<link
					rel='icon'
					type='image/ico'
					href='https://firebasestorage.googleapis.com/v0/b/cloudia-ai.appspot.com/o/logo.png?alt=media&token=6eaf6e62-6fa9-426e-a5ca-1531b98cbf4e'
				/>
			</Head>
			{/* <main>{children}</main> */}
			<main style={{ height: height ? height : '100%' }}>{children}</main>
		</>
	);
};
