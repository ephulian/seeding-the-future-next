import '../styles/Global.scss';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { store } from '../store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
	const resetHeight = () => {
		document.body.style.height = window.innerHeight + 'px';
	};

	useEffect(() => {
		window.addEventListener('resize', resetHeight);
		resetHeight();
	}, []);

	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
