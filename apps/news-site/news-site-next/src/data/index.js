import { pages as pagesEn } from "@/data/en/pages";
import { pages as pagesJp } from "@/data/jp/pages";
import { pages as pagesAr } from "@/data/ar/pages";

import { alerts as alertsEn } from "@/data/en/alerts";
import { alerts as alertsJp } from "@/data/jp/alerts";
import { alerts as alertsAr } from "@/data/ar/alerts";

import { content as contentEn } from "@/data/en/content";
import { content as contentJp } from "@/data/jp/content";
import { content as contentAr } from "@/data/ar/content";

import { language as languageEn } from "@/data/en/language";
import { language as languageJp } from "@/data/jp/language";
import { language as languageAr } from "@/data/ar/language";

import * as buttonsEn from "@/data/en/buttons";
import * as buttonsJp from "@/data/jp/buttons";
import * as buttonsAr from "@/data/ar/buttons";

import * as linksEn from "@/data/en/links";
import * as linksJp from "@/data/jp/links";
import * as linksAr from "@/data/ar/links";

import * as formsEn from "@/data/en/form";
import * as formsJp from "@/data/jp/form";
import * as formsAr from "@/data/ar/form";

export const dataSource = {
    en: {
        alerts: alertsEn,
        pages: pagesEn,
        content: contentEn,
        language: languageEn,
        buttons: buttonsEn,
        links: linksEn,
        forms: formsEn,
    },
    jp: {
        alerts: alertsJp,
        pages: pagesJp,
        content: contentJp,
        language: languageJp,
        buttons: buttonsJp,
        links: linksJp,
        forms: formsJp,
    },
    ar: {
        alerts: alertsAr,
        pages: pagesAr,
        content: contentAr,
        language: languageAr,
        buttons: buttonsAr,
        links: linksAr,
        forms: formsAr,
    },
};
