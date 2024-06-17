import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Page from "@/partials/page/page";
import PageGA from "@/partials/page/page-ga";
import PageGTM from "@/partials/page/page-gtm";
import PageGTMGA from "@/partials/page/page-gtm-ga";
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
                <Router>
                    <Routes>
                        <Route path="/business" element={<PageGTM id="business" />} />
                        <Route path="/health" element={<Page id="health" />} />
                        <Route path="/opinion" element={<Page id="opinion" />} />
                        <Route path="/politics" element={<PageGA id="politics" />} />
                        <Route path="/us" element={<Page id="us" />} />
                        <Route path="/world" element={<Page id="world" />} />
                        <Route path="/home" element={<Page id="home" />} />
                        <Route path="/" element={<PageGTMGA id="home" />} />
                    </Routes>
                </Router>
            </DataContextProvider>
            <Script src="./benchmark-connector.min.js" />
        </>
    );
}
