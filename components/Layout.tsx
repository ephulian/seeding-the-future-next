// import styles from '../styles/Layout.module.css';
// import { Header } from './Header';
// import Meta from './Meta';

import Head from 'next/head';
import { useEffect, useRef } from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const main: any = useRef();

	useEffect(() => {
		// main.current.style.border = '1px solid red';
		document.body.style.height = window.innerHeight + 'px';
	});

	return (
		<>
			{/* <Meta /> */}
			<Head>
				<title>Cloudia</title>
				<link
					rel='icon'
					type='image/ico'
					href='https://firebasestorage.googleapis.com/v0/b/stf-db.appspot.com/o/logo.png?alt=media&token=ab5e73ec-47d8-4102-be7a-06911d50be27'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
			</Head>
			{/* <main>{children}</main> */}
			<main ref={main}>{children}</main>
		</>
	);
};
