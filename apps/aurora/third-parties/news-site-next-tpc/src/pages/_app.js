import "news-site-css/dist/variables.css";
import "news-site-css/dist/global.css";
import "news-site-css/dist/a11y.css";
import "news-site-css/dist/icons.css";
import "news-site-css/dist/text.css";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";

function App({ Component, pageProps }) {
    const [render, setRender] = useState(false);
    useEffect(() => setRender(true), []);
    return render
        ? <>
            <Component {...pageProps} />
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY} />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY} />
        </>
        : null;
}
export default App;
