
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
                <iframe
                    width="100%"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&q=${map.q}`}
                >
                </iframe>
                <ArticleTag tag={meta?.tag} />
            </div>
            <ArticleText textClass={styles["article-map-captions"]} text={meta?.captions} />
        </>
    );
}
