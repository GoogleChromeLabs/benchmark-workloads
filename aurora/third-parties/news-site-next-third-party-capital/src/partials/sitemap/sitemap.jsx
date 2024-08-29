import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { useDataContext } from "@/context/data-context";

import styles from "news-site-css/dist/sitemap.module.css";

export default function Sitemap() {
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
                        <NavLink to={pages[key].url} className={({ isActive }) => classNames({ [styles.active]: isActive })}>
                            <h4 className={styles["sitemap-header"]}>{pages[key].name}</h4>
                        </NavLink>
                        <ul className={styles["sitemap-sublist"]}>
                            {sections[key].map((section) =>
                                <li className={styles["sitemap-subitem"]} key={`sitemap-section${section.id}`}>
                                    <HashLink to={`${pages[key].url}#${section.id}`}>{section.name}</HashLink>
                                </li>
                            )}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    );
}
