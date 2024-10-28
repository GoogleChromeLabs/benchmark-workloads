import { createContext, useContext, useEffect, useState } from "react";
import { dataSource } from "../data";

const RTL_LOCALES = ["ar", "he", "fa", "ps", "ur"];
const DEFAULT_LANG = "en";
const DEFAULT_DIR = "ltr";

const DataContext = createContext(null);

let initConfigPromise = null;
function getAndInitializePageConfig() {
    initConfigPromise ??= (async () => {
        /**
         * read lang & dir
         */
        const urlParams = new URLSearchParams(window.location.search);
        const langFromUrl = urlParams.get("lang")?.toLowerCase();
        const lang = langFromUrl && langFromUrl in dataSource ? langFromUrl : DEFAULT_LANG;
        const dir = lang && RTL_LOCALES.includes(lang) ? "rtl" : DEFAULT_DIR;

        document.documentElement.setAttribute("dir", dir);
        document.documentElement.setAttribute("lang", lang);

        /**
         * read config and fetch
         */

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
            lang,
            dir,
            ...dataSource[lang],
            config: { ...config },
        };
    })();
    return initConfigPromise;
}

export const DataContextProvider = ({ children }) => {
    const [value, setValue] = useState({});

    useEffect(() => {
        let ignore = false;
        getAndInitializePageConfig().then((config) => {
            if (!ignore)
                setValue(config);
        });

        return () => {
            ignore = true;
        };
    }, []);

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
    const dataContext = useContext(DataContext);

    if (!dataContext)
        throw new Error("A DataProvider must be rendered before using useDataContext");

    return dataContext;
};
