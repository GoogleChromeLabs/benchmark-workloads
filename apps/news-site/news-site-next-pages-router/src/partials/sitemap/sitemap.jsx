import classNames from "classnames";
import Link from "next/link";

import { useDataContext } from "@/context/data-context";
import { usePathname } from "next/navigation";

import styles from "news-site-css/dist/sitemap.module.css";

export default function Sitemap() {
    const pathname = usePathname();
    const { sections, pages } = useDataContext();

    const keys = Object.keys(pages);
    const navItems = keys.reduce((result, key) => {
        result.push(key);
        return result;
    }, []);

    return (
        <div className={styles.sitemap}>
            <ul className={styles["sitemap-list"]}>
                {navItems.map((key) =>
                    <li className={styles["sitemap-item"]} key={`sitemap-page-${pages[key].name}`}>
                        <Link href={pages[key].url} className={classNames({ [styles.active]: pathname.split("/")[1] === key })}>
                            <h4 className={styles["sitemap-header"]}>{pages[key].name}</h4>
                        </Link>
                        <ul className={styles["sitemap-sublist"]}>
                            {sections[key].map((section) =>
                                <li className={styles["sitemap-subitem"]} key={`sitemap-section${section.id}`}>
                                    <Link href={`${pages[key].url}#${section.id}`}>{section.name}</Link>
                                </li>
                            )}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    );
}
