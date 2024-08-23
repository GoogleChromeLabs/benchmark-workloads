import { pages as pagesEn } from "@/data/en/pages";
import { pages as pagesJp } from "@/data/jp/pages";
import { pages as pagesAr } from "@/data/ar/pages";

import { sections as sectionsEn } from "@/data/en/sections";
import { sections as sectionsJp } from "@/data/jp/sections";
import { sections as sectionsAr } from "@/data/ar/sections";

import { alerts as alertsEn } from "@/data/en/alerts";
import { alerts as alertsJp } from "@/data/jp/alerts";
import { alerts as alertsAr } from "@/data/ar/alerts";

import { home as homeEn } from "@/data/en/content/home";
import { home as homeJp } from "@/data/jp/content/home";
import { home as homeAr } from "@/data/ar/content/home";

import { us as usEn } from "@/data/en/content/us";
import { us as usJp } from "@/data/jp/content/us";
import { us as usAr } from "@/data/ar/content/us";

import { world as worldEn } from "@/data/en/content/world";
import { world as worldJp } from "@/data/jp/content/world";
import { world as worldAr } from "@/data/ar/content/world";

import { politics as politicsEn } from "@/data/en/content/politics";
import { politics as politicsJp } from "@/data/jp/content/politics";
import { politics as politicsAr } from "@/data/ar/content/politics";

import { business as businessEn } from "@/data/en/content/business";
import { business as businessJp } from "@/data/jp/content/business";
import { business as businessAr } from "@/data/ar/content/business";

import { opinion as opinionEn } from "@/data/en/content/opinion";
import { opinion as opinionJp } from "@/data/jp/content/opinion";
import { opinion as opinionAr } from "@/data/ar/content/opinion";

import { health as healthEn } from "@/data/en/content/health";
import { health as healthJp } from "@/data/jp/content/health";
import { health as healthAr } from "@/data/ar/content/health";

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
        sections: sectionsEn,
        content: {
            home: homeEn,
            us: usEn,
            world: worldEn,
            politics: politicsEn,
            business: businessEn,
            opinion: opinionEn,
            health: healthEn,
        },
        language: languageEn,
        buttons: buttonsEn,
        links: linksEn,
        forms: formsEn,
    },
    jp: {
        alerts: alertsJp,
        pages: pagesJp,
        sections: sectionsJp,
        content: {
            home: homeJp,
            us: usJp,
            world: worldJp,
            politics: politicsJp,
            business: businessJp,
            opinion: opinionJp,
            health: healthJp,
        },
        language: languageJp,
        buttons: buttonsJp,
        links: linksJp,
        forms: formsJp,
    },
    ar: {
        alerts: alertsAr,
        pages: pagesAr,
        sections: sectionsAr,
        content: {
            home: homeAr,
            us: usAr,
            world: worldAr,
            politics: politicsAr,
            business: businessAr,
            opinion: opinionAr,
            health: healthAr,
        },
        language: languageAr,
        buttons: buttonsAr,
        links: linksAr,
        forms: formsAr,
    },
};
