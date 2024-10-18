import classNames from "classnames";
import Image from "next/image";
import ArticleTag from "@/components/molecules/article/article-tag";
import LeftButton from "@/components/assets/left-button";
import RightButton from "@/components/assets/right-button";

import styles from "news-site-css/dist/article.module.css";
import carouselStyles from "./article-carousel.module.css";
import buttonStyles from "news-site-css/dist/button.module.css";

export default function ArticleCarousel({ data, imageClass, meta }) {
    if (!data)
        return null;

    const imageDir = process.env.TARGET && process.env.TARGET === "static" ? "./" : "/";
    const aspectRatio = data.width / data.height;

    function prev() {
        console.log("prev");
    }

    function next() {
        console.log("next");
    }

    return (
        <div className={carouselStyles.container} style={{ aspectRatio }}>
            <div className={carouselStyles.content}>
                {
                    data.images.map(image => <div className={imageClass} key={image.id} >
                        <Image className={styles["article-image"]} src={`${imageDir}${image.src}`} width={image.width} height={image.height} style={{ width: "100%", height: "auto", position: "absolute" }} alt={image.alt} />
                    </div>)
                }
            </div>
            <div className={carouselStyles.buttons}>
                <button id="prev-button" className={classNames(buttonStyles.button, buttonStyles["primary-button"], buttonStyles["icon-button"])} onClick={prev}>
                    <LeftButton />
                </button>
                <button id="next-button" className={classNames(buttonStyles.button, buttonStyles["primary-button"], buttonStyles["icon-button"])} onClick={next}>
                    <RightButton />
                </button>
            </div>
            <ArticleTag tag={meta?.tag} />
        </div>
    );
}
