import React from "react";
import Page from "@/partials/page/page";
import Head from "next/head";
import { DataContextProvider } from "@/context/data-context";
import Script from "next/script";

export default function Opinion() {
    return (
        <>
            <Head>
                <title>The Daily Broadcast</title>
                <meta name="description" content="A news site developed with Next.js." key="description" />
                <meta http-equiv="Permissions-Policy" content="interest-cohort=()" />
            </Head>
            <DataContextProvider>
                <Page id="opinion" />
            </DataContextProvider>
            <Script src="./benchmark-connector.min.js" />
        </>
    );
}
