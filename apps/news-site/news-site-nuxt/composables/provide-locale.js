import { provide, ref } from "vue";
import { useHead } from "#imports";
import { dataSource } from "../data";

const RTL_LOCALES = ["ar", "he", "fa", "ps", "ur"];
const DEFAULT_LANG = "en";
const DEFAULT_DIR = "ltr";

let initConfigPromise = null;
function getAndInitializePageConfig() {
    initConfigPromise ??= (async () => {
        /**
         * read config and fetch
         */
        const urlParams = new URLSearchParams(window.location.search);
        const configParam = urlParams.get("config");
        let config = {};

        /**
         * decide to load config
         */
        if (configParam) {
            const response = await fetch(configParam);
            config = await response.json();
        }

        return {
            config: { ...config },
        };
    })();
    return initConfigPromise;
}

export function provideLocale() {
    // temp solution
    if (process.client) {
        const urlParams = new URLSearchParams(window.location.search);
        const langFromUrl = urlParams.get("lang")?.toLowerCase();
        const lang = langFromUrl && langFromUrl in dataSource ? langFromUrl : DEFAULT_LANG;
        const dir = lang && RTL_LOCALES.includes(lang) ? "rtl" : DEFAULT_DIR;

        useHead({
            htmlAttrs: { dir, lang },
        });

        const data = ref({
            lang,
            dir,
            ...dataSource[lang],
        });

        provide("data", data);

        getAndInitializePageConfig().then((config) => {
            data.value = {
                ...data.value,
                ...config
            };
        });
    } else {
        provide("data", {
            lang: "en",
            dir: "ltr",
            ...dataSource["en"]
        });
    }
}
