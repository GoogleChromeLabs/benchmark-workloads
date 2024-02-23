import React from "react";
import Page from "@/partials/page/page";
import Head from "next/head";
import { DataContextProvider } from "@/context/data-context";

export default function World() {
    return (
        <>
            <Head>
                <title>The Daily Broadcast</title>
                <meta name="description" content="A news site developed with Next.js." key="description" />
                <meta http-equiv="Permissions-Policy" content="interest-cohort=()" />
            </Head>
            <DataContextProvider>
                <Page id="world" />
            </DataContextProvider>
        </>
    );
}
