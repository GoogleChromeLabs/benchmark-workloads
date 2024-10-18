import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HashLink } from "react-router-hash-link";

import Header from "@/partials/header/header";
import Navigation from "@/components/organisms/navigation/navigation";
import Main from "@/components/organisms/main/main";
import Footer from "@/components/organisms/footer/footer";
import Ad from "@/components/atoms/ad/ad";

import { useDataContext } from "@/context/data-context";
import { Message } from "@/components/molecules/message/message";

import styles from "news-site-css/dist/layout.module.css";
import { useRouter } from "next/router";

export default function Layout({ children, id }) {
    const [showMessage, setShowMessage] = useState(false);
    const { alerts, links, config } = useDataContext();
    const router = useRouter();
    const hero = config?.ads?.[id].hero;

    function handleRouteChangeComplete(url) {
        window.dispatchEvent(new CustomEvent("route-change-complete", { detail: { url } }));
    }

    useEffect(() => {
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => router.events.off("routeChangeComplete", handleRouteChangeComplete);
    }, []);

    useEffect(() => {
        setShowMessage(alerts[id].message);
    }, [alerts, id]);

    const pageRef = useRef(null);
    const pathname = usePathname();

    function closeMessage() {
        setShowMessage(false);
    }

    return (
        <>
            <HashLink to={`${pathname}#content`} className="skip-link">
                {links.a11y.skip.label}
            </HashLink>
            <div className={styles.page} ref={pageRef}>
                {hero ? <Ad data={hero} location="header" /> : null}
                <Header />
                <Navigation />
                {showMessage ? <Message message={alerts[id].message} onClose={closeMessage} /> : null}
                <Main>{children}</Main>
                <Footer />
            </div>
        </>
    );
}
