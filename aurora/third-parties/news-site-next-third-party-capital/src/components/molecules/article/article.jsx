import classNames from "classnames";

import ArticleHeader from "./article-header";
import ArticleImage from "./article-image";
import ArticleText from "./article-text";
import ArticleContent from "./article-content";
import ArticleVideo from "./article-video";
import ArticleMap from "./article-map";

import layoutStyles from "news-site-css/dist/layout.module.css";
import articleStyles from "news-site-css/dist/article.module.css";

export default function Article({ article }) {
    return (
        <article className={classNames(layoutStyles.column, layoutStyles[article.class], articleStyles.article)}>
            <ArticleHeader headerClass={articleStyles["article-header"]} text={article.header} link={article.url} />
            <section className={articleStyles["article-body"]}>
                { article.image
                    ? <ArticleImage imageClass={articleStyles["article-image-container"]} image={article.image} meta={article.meta} />
                    : null
                }
                { article.video
                    ? <ArticleVideo videoClass={articleStyles["article-video-container"]} video={article.video} meta={article.meta} />
                    : null
                }
                { article.map
                    ? <ArticleMap mapClass={articleStyles["article-map-container"]} map={article.map} meta={article.meta} />
                    : null
                }
                <ArticleText textClass={classNames(articleStyles["article-title"], "truncate-singleline")} text={article.title} type="h3" />
                <ArticleContent type={article.type} content={article.content} display={article.display} />
            </section>
        </article>
    );
}
