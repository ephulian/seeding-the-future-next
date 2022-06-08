// import styles from '../styles/Layout.module.css';
// import { Header } from './Header';
// import Meta from './Meta';

import Head from 'next/head';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* <Meta /> */}
			<Head>
				<title>Cloudia</title>
			</Head>
			<main>{children}</main>
		</>
	);
};
