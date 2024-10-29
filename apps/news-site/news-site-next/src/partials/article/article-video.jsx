import { useRef } from "react";

import ArticleTag from "@/components/molecules/article/article-tag";
import ArticleText from "@/components/molecules/article/article-text";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

import videoStyles from "./article-video.module.css";
import styles from "news-site-css/dist/article.module.css";

export default function ArticleVideo ({ data, meta }) {
    if (!data)
        return null;

    const videoRef = useRef(undefined);

    const { elementRef, disconnect } = useIntersectionObserver({
        callback: handleOnIntersection
    });

    function handleOnIntersection(entries) {
        for (let entry of entries) {
            if (!entry.isIntersecting)
                return;

            disconnect();
            videoRef.current.setAttribute("autoplay", true);
        }
    }

    const videoSource = process.env.TARGET && process.env.TARGET === "static" ? `./${data.src}` : `/${data.src}`;
    const aspectRatio = data.width / data.height;

    return (
        <>
            <div className={videoStyles.container} style={{ aspectRatio }} ref={elementRef}>
                <div className={videoStyles.content}>
                    <video id={data.id} src={videoSource} muted controls playsInline ref={videoRef} />
                </div>
                <ArticleTag tag={meta?.tag} />
            </div>
            <ArticleText textClass={styles["article-image-captions"]} text={meta?.captions} />
        </>
    );
}
