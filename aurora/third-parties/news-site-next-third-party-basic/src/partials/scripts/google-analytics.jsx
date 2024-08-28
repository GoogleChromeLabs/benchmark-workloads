import Script from "next/script";

export function GoogleAnalytics({ gaId, dataLayerName = "dataLayer" }) {
    return (
        <>
            <Script
                id="_basic-ga-init"
                dangerouslySetInnerHTML={{
                    __html: `
                    window['${dataLayerName}'] = window['${dataLayerName}'] || [];
                    function gtag(){window['${dataLayerName}'].push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', '${gaId}');`,
                }}
            />
            <Script
                id="_basic-ga"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
        </>
    );
}
