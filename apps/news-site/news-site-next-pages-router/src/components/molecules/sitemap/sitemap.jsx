import classNames from "classnames";
import Link from "next/link";

import { useDataContext } from "@/context/data-context";
import { usePathname } from "next/navigation";

import styles from "news-site-css/dist/sitemap.module.css";

export default function Sitemap() {
    const { content } = useDataContext();
    const pathname = usePathname();

    const keys = Object.keys(content);
    const navItems = keys.reduce((result, key) => {
        result.push(key);
        return result;
    }, []);

    return (
        <div className={styles.sitemap}>
            <ul className={styles["sitemap-list"]}>
                {navItems.map((key) =>
                    <li className={styles["sitemap-item"]} key={`sitemap-page-${content[key].name}`}>
                        <Link href={content[key].url} className={classNames({ [styles.active]: pathname.split("/")[1] === key })}>
                            <h4 className={styles["sitemap-header"]}>{content[key].name}</h4>
                        </Link>
                        <ul className={styles["sitemap-sublist"]}>
                            {content[key].sections.map((section) =>
                                <li className={styles["sitemap-subitem"]} key={`sitemap-section${section.id}`}>
                                    <Link href={`${content[key].url}#${section.id}`}>{section.name}</Link>
                                </li>
                            )}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    );
}
