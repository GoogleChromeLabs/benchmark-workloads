import { GoogleMapsEmbed } from "@next/third-parties/google";

import ArticleText from "./article-text";
import ArticleTag from "./article-tag";

import styles from "news-site-css/dist/article.module.css";

export default function ArticleMap({ map, mapClass, meta }) {
    if (!map)
        return null;

    document.body.style.setProperty("--map-aspect-ratio", map.width / map.height);

    return (
        <>
            <div className={mapClass}>
                <GoogleMapsEmbed apiKey="" width="100%" mode={map.mode} q={map.q}/>
                <ArticleTag tag={meta?.tag} />
            </div>
            <ArticleText textClass={styles["article-map-captions"]} text={meta?.captions} />
        </>
    );
}
