import ArticleText from "./article-text";
import ArticleTag from "./article-tag";

import styles from "news-site-css/dist/article.module.css";

export default function ArticleVideo({ video, videoClass, meta }) {
    if (!video)
        return null;

    document.body.style.setProperty("--video-aspect-ratio", video.width / video.height);

    return (
        <>
            <div className={videoClass}>
                <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                />
                <ArticleTag tag={meta?.tag} />
            </div>
            <ArticleText textClass={styles["article-video-captions"]} text={meta?.captions} />
        </>
    );
}
