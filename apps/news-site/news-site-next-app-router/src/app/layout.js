import { DataContextProvider } from "@/context/data-context";

import "news-site-css/dist/variables.css";
import "news-site-css/dist/global.css";
import "news-site-css/dist/a11y.css";
import "news-site-css/dist/icons.css";
import "news-site-css/dist/text.css";

export const metadata = {
    title: "The Daily Broadcast",
    description: "A news site developed with Next.js.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <DataContextProvider>
                    {children}
                </DataContextProvider>
                <div id="settings-container"></div>
                <div id="notifications-container"></div>
                <div id="sitemap-container"></div>
                <div id="login-container"></div>
            </body>
        </html>
    );
}
