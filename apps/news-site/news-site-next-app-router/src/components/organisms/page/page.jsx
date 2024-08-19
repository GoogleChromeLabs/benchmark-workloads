"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Layout from "@/components/organisms/layout/layout";
import Section from "@/components/organisms/section/section";
import Toast from "@/components/molecules/toast/toast";

import { useDataContext } from "@/context/data-context";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function Page({ id }) {
    const [showPortal, setShowPortal] = useState(false);
    const { content } = useDataContext();

    /** assign app settings from local storage */
    const [reduceMotion] = useLocalStorage("news-site-settings-reduced-motion", false);
    const [highContrast] = useLocalStorage("news-site-settings-high-contrast", false);

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
        </>
    );
}
