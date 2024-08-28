import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Layout from "@/partials/layout/layout";
import Section from "@/components/organisms/section/section";
import Toast from "@/components/molecules/toast/toast";

import { useDataContext } from "@/context/data-context";

import { GoogleAnalytics } from "@/partials/scripts/google-analytics";

export default function PageGA({ id }) {
    const [showPortal, setShowPortal] = useState(false);
    const { content, alerts } = useDataContext();

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
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY} />
        </>
    );
}
