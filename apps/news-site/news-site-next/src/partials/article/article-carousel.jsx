/* eslint-disable curly */
import { useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import ArticleTag from "@/components/molecules/article/article-tag";
import ArticleText from "@/components/molecules/article/article-text";
import LeftButton from "@/components/assets/left-button";
import RightButton from "@/components/assets/right-button";

import styles from "news-site-css/dist/article.module.css";
import carouselStyles from "./article-carousel.module.css";
import buttonStyles from "news-site-css/dist/button.module.css";

export default function ArticleCarousel({ data, imageClass, meta }) {
    if (!data)
        return null;

    const [direction, setDirection] = useState("right-to-left");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(data.images.length - 1);
    const [nextIndex, setNextIndex] = useState(1);

    const imageDir = process.env.TARGET && process.env.TARGET === "static" ? "./" : "/";
    const aspectRatio = data.width / data.height;

    function animate(dir) {
        setDirection(dir === "prev" ? "left-to-right" : "right-to-left");

        if (dir === "prev") {
            setPrevIndex(prevIndex === 0 ? data.images.length - 1 : prevIndex - 1);
            setCurrentIndex(currentIndex === 0 ? data.images.length - 1 : currentIndex - 1);
            setNextIndex(nextIndex === 0 ? data.images.length - 1 : nextIndex - 1);
        } else {
            setPrevIndex(prevIndex === data.images.length - 1 ? 0 : prevIndex + 1);
            setCurrentIndex(currentIndex === data.images.length - 1 ? 0 : currentIndex + 1);
            setNextIndex(nextIndex === data.images.length - 1 ? 0 : nextIndex + 1);
        }
    }

    function prev() {
        animate("prev");
    }

    function next() {
        animate("next");
    }

    return (
        <div className={carouselStyles.container} style={{ aspectRatio }}>
            <div className={carouselStyles.content}>
                {data.images.map((image, index) =>
                    <div
                        className={classNames(imageClass, carouselStyles.image, carouselStyles[direction], {
                            [carouselStyles["prev-slide"]]: index === prevIndex,
                            [carouselStyles["next-slide"]]: index === nextIndex,
                            [carouselStyles["current-slide"]]: index === currentIndex,
                        })}
                        key={image.id}
                    >
                        <Image key={image.id} className={classNames(styles["article-image"])} src={`${imageDir}${image.src}`} width={image.width} height={image.height} alt={image.alt} />
                        <ArticleText text={image.alt} textClass={carouselStyles.text} />
                    </div>
                )}
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
