import classNames from "classnames";

import ArticleHeader from "@/components/molecules/article/article-header";
import ArticleImage from "@/components/molecules/article/article-image";
import ArticleText from "@/components/molecules/article/article-text";
import ArticleContent from "@/components/molecules/article/article-content";

import layoutStyles from "news-site-css/dist/layout.module.css";
import articleStyles from "news-site-css/dist/article.module.css";
import ArticleCarousel from "./article-carousel";
import ArticleVideo from "./article-video";

export default function Article({ article, ad }) {
    return (
        <article className={classNames(layoutStyles.column, layoutStyles[article.class], articleStyles.article)}>
            <ArticleHeader headerClass={articleStyles["article-header"]} text={article.header} link={article.url} />
            <section className={articleStyles["article-body"]}>
                {article.image ? <ArticleImage imageClass={articleStyles["article-image-container"]} image={article.image} meta={article.meta} /> : null}
                {article.carousel ? <ArticleCarousel imageClass={articleStyles["article-image-container"]} data={article.carousel} meta={article.meta} /> : null}
                {article.video && article.video.type === "HTML5 Video" ? <ArticleVideo data={article.video} meta={article.meta} /> : null }
                <ArticleText textClass={classNames(articleStyles["article-title"], "truncate-singleline")} text={article.title} type="h3" />
                <ArticleContent type={article.type} content={article.content} display={article.display} ad={ad} />
            </section>
        </article>
    );
}
