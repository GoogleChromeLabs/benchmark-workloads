import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Layout from "@/partials/layout/layout";
import Section from "@/components/organisms/section/section";
import Toast from "@/components/molecules/toast/toast";

import { useDataContext } from "@/context/data-context";
import { useLocalStorage } from "@/hooks/use-local-storage";

import { GoogleTagManager } from "@/partials/scripts/google-tag-manager";

import { BenchmarkConnector } from "workload-testing-utils/dist/benchmark.mjs";
import suites, { appName, appVersion } from "@/workload-test.mjs";

export default function PageGTM({ id }) {
    const [showPortal, setShowPortal] = useState(false);
    const { content, alerts } = useDataContext();

    /** assign app settings from local storage */
    const [reduceMotion] = useLocalStorage("news-site-settings-reduced-motion", false);
    const [highContrast] = useLocalStorage("news-site-settings-high-contrast", false);

    useEffect(() => {
        /*
            Paste below into dev console for manual testing:
            window.addEventListener("message", (event) => console.log(event.data));
            window.postMessage({ id: "news-site-next-third-party-basic-1.0.0", key: "benchmark-connector", type: "benchmark-suite", name: "default" }, "*");
        */
        const benchmarkConnector = new BenchmarkConnector(suites, appName, appVersion);
        benchmarkConnector.connect();

        return () => benchmarkConnector.disconnect();
    }, []);

    useEffect(() => {
        if (reduceMotion)
            document.documentElement.classList.add("reduced-motion");
        else
            document.documentElement.classList.remove("reduced-motion");

        if (highContrast)
            document.documentElement.classList.add("forced-colors");
        else
            document.documentElement.classList.remove("forced-colors");
    }, []);

    useEffect(() => {
        setShowPortal(alerts[id].notification);
    }, [id]);

    function closePortal() {
        setShowPortal(false);
    }

    function onAccept() {
        closePortal();
    }

    function onReject() {
        closePortal();
    }

    return (
        <>
            <Layout id={id}>
                {content[id].map((section) =>
                    <Section key={section.id} section={section} />
                )}
            </Layout>
            {showPortal && alerts[id].notification ? createPortal(<Toast notification={alerts[id].notification} onAccept={onAccept} onReject={onReject} onClose={onReject} />, document.getElementById("notifications-container")) : null}
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY} />
        </>
    );
}
