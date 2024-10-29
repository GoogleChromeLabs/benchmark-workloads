import Article from "@/partials/article/article";

import { useDataContext } from "@/context/data-context";

import styles from "news-site-css/dist/layout.module.css";
import { Fragment } from "react";

export default function Section({ section, sectionIndex, pageId }) {
    const { config } = useDataContext();
    const ad = config?.ads?.[pageId].articles?.[sectionIndex];

    return (
        <>
            {section.name
                ? <div id={section.id} className={styles["row-header"]}>
                    <h2>{section.name}</h2>
                </div>
                : null}
            <section className={styles.row}>
                {section.articles.map((article, index) =>
                    <Fragment key={article.id}>
                        <Article article={article} sectionIndex={sectionIndex} pageId={pageId} ad={index === section.articles.length - 1 ? ad : null} />
                    </Fragment>
                )}
            </section>
        </>
    );
}
