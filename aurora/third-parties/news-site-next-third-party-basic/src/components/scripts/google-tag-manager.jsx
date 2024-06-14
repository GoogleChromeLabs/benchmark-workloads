import Script from "next/script";

export function GoogleTagManager({ gtmId, dataLayerName = "dataLayer" }) {
    return (
        <>
            <Script
                id="_basic-gtm-init"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(w,l){
                            w[l]=w[l]||[];
                            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                        })(window,'${dataLayerName}');`,
                }}
            />
            <Script
                id="_basic-gtm"
                src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
            />
        </>
    );
}
