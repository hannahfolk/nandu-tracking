import Head from "next/head";
import { ApolloProvider } from "@apollo/client";

import client from "@/graphql/client";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Nandu Tracking</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Other meta tags */}
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
