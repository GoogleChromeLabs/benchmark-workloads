
import { GoogleMapsEmbed } from "@next/third-parties/google";

import ArticleText from "@/components/molecules/article/article-text";
import ArticleTag from "@/components/molecules/article/article-tag";

import styles from "news-site-css/dist/article.module.css";

export default function ArticleMap({ map, mapClass, meta }) {
    if (!map)
        return null;

    document.body.style.setProperty("--map-aspect-ratio", map.width / map.height);

    return (
        <>
            <div className={mapClass}>
                <GoogleMapsEmbed apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} width="100%" mode={map.mode} q={map.q}/>
                <ArticleTag tag={meta?.tag} />
            </div>
            <ArticleText textClass={styles["article-map-captions"]} text={meta?.captions} />
        </>
    );
}
