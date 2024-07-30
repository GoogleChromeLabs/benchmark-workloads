"use client";

import { createContext, useContext, useLayoutEffect } from "react";
import { dataSource } from "../data";
import { useSearchParams } from "next/navigation";

const RTL_LOCALES = ["ar", "he", "fa", "ps", "ur"];
const DEFAULT_LANG = "en";
const DEFAULT_DIR = "ltr";

const DataContext = createContext(null);

export const DataContextProvider = ({ children }) => {

    const searchParams = useSearchParams();
    const langFromUrl = searchParams.get("lang")?.toLowerCase();
    const lang = langFromUrl && langFromUrl in dataSource ? langFromUrl : DEFAULT_LANG;
    const dir = lang && RTL_LOCALES.includes(lang) ? "rtl" : DEFAULT_DIR;

    useLayoutEffect(() => {
        document.documentElement.setAttribute("dir", dir);
        document.documentElement.setAttribute("lang", lang);
    }, []);

    const value = {
        lang,
        dir,
        ...dataSource[lang],
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
    const dataContext = useContext(DataContext);

    if (!dataContext)
        throw new Error("A DataProvider must be rendered before using useDataContext");

    return dataContext;
};
