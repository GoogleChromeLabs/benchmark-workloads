import { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Page from "@/partials/page/page";
import Head from "next/head";
import { DataContextProvider } from "@/context/data-context";
import { BenchmarkConnector } from "workload-testing-utils/dist/benchmark.mjs";
import suites, { appName, appVersion } from "@/workload-test.mjs";

export default function App() {
    useEffect(() => {
        /*
        window.addEventListener("message", (event) => console.log(event.data));
        window.postMessage({ id: "news-next-1", key: "benchmark-connector", type: "benchmark-suite", name: "default" }, "*");
        */
        const benchmarkConnector = new BenchmarkConnector(suites, appName, appVersion);
        benchmarkConnector.connect();

        return () => benchmarkConnector.disconnect();
    }, []);
    return (
        <>
            <Head>
                <title>The Daily Broadcast</title>
                <meta name="description" content="A news site developed with Next.js." key="description" />
            </Head>
            <DataContextProvider>
                <Router>
                    <Routes>
                        <Route path="/business" element={<Page id="business" />} />
                        <Route path="/health" element={<Page id="health" />} />
                        <Route path="/opinion" element={<Page id="opinion" />} />
                        <Route path="/politics" element={<Page id="politics" />} />
                        <Route path="/us" element={<Page id="us" />} />
                        <Route path="/world" element={<Page id="world" />} />
                        <Route path="/home" element={<Page id="home" />} />
                        <Route path="/" element={<Page id="home" />} />
                    </Routes>
                </Router>
            </DataContextProvider>
        </>
    );
}
