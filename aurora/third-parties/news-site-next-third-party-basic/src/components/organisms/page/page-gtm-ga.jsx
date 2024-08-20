import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Layout from "@/components/organisms/layout/layout";
import Section from "@/components/organisms/section/section";
import Toast from "@/components/molecules/toast/toast";

import { useDataContext } from "@/context/data-context";

import { GoogleTagManager } from "@/components/scripts/google-tag-manager";
import { GoogleAnalytics } from "@/components/scripts/google-analytics";

export default function PageGTMGA({ id }) {
    const [showPortal, setShowPortal] = useState(false);
    const { content } = useDataContext();

    useEffect(() => {
        setShowPortal(content[id].notification);
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
                {content[id].sections.map((section) =>
                    <Section key={section.id} section={section} />
                )}
            </Layout>
            {showPortal && content[id].notification ? createPortal(<Toast notification={content[id].notification} onAccept={onAccept} onReject={onReject} onClose={onReject} />, document.getElementById("notifications-container")) : null}
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY} />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY} />
        </>
    );
}
