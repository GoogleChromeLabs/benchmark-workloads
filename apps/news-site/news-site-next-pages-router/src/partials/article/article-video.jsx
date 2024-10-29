import ArticleTag from "@/components/molecules/article/article-tag";
import ArticleText from "@/components/molecules/article/article-text";

import videoStyles from "./article-video.module.css";
import styles from "news-site-css/dist/article.module.css";

export default function ArticleVideo ({ data, meta }) {
    if (!data)
        return null;

    const videoSource = process.env.TARGET && process.env.TARGET === "static" ? `./${data.src}` : `/${data.src}`;
    const aspectRatio = data.width / data.height;

    return (
        <>
            <div className={videoStyles.container} style={{ aspectRatio }}>
                <div className={videoStyles.content}>
                    <video src={videoSource} muted autoPlay controls playsinline webkit-playsinline/>
                </div>
                <ArticleTag tag={meta?.tag} />
            </div>
            <ArticleText textClass={styles["article-image-captions"]} text={meta?.captions} />
        </>
    );
}
