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
				<link
					rel='icon'
					type='image/ico'
					href='https://firebasestorage.googleapis.com/v0/b/stf-db.appspot.com/o/logo.png?alt=media&token=ab5e73ec-47d8-4102-be7a-06911d50be27'
				/>
			</Head>
			<main>{children}</main>
		</>
	);
};
