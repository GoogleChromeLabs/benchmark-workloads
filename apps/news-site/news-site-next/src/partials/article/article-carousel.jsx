import Image from "next/image";
import ArticleTag from "@/components/molecules/article/article-tag";

import styles from "news-site-css/dist/article.module.css";

export default function ArticleCarousel({ images, imageClass, meta }) {
    if (!images)
        return null;

    const imageDir = process.env.TARGET && process.env.TARGET === "static" ? "./" : "/";
    return (
        <>
            <div className={imageClass}>
                <Image className={styles["article-image"]} src={`${imageDir}${images[0].src}`} width={images[0].width} height={images[0].height} style={{ width: "100%", height: "auto" }} alt={images[0].alt} />
            </div>
            <ArticleTag tag={meta?.tag} />
        </>
    );
}
