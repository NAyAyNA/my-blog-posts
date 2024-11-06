
import { AppProps } from "next/app";
import "../styles/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;


