import { YouTubeEmbed } from "@next/third-parties/google";

import ArticleText from "@/components/molecules/article/article-text";
import ArticleTag from "@/components/molecules/article/article-tag";

import styles from "news-site-css/dist/article.module.css";

export default function ArticleVideo({ video, videoClass, meta }) {
    if (!video)
        return null;

    document.body.style.setProperty("--video-aspect-ratio", video.width / video.height);

    return (
        <>
            <div className={videoClass}>
                <YouTubeEmbed videoid={video.id} params="controls=0" />
                <ArticleTag tag={meta?.tag} />
            </div>
            <ArticleText textClass={styles["article-video-captions"]} text={meta?.captions} />
        </>
    );
}
