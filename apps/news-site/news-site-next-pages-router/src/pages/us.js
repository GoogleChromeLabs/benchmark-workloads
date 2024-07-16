import React from "react";
import Page from "@/partials/page/page";
import Head from "next/head";
import { DataContextProvider } from "@/context/data-context";
import Script from "next/script";

export default function App() {
    return (
        <>
            <Head>
                <title>The Daily Broadcast</title>
                <meta name="description" content="A news site developed with Next.js." key="description" />
            </Head>
            <DataContextProvider>
                <Page id="us" />
            </DataContextProvider>
            <Script src="./benchmark-connector.min.js" />
        </>
    );
}
