import Link from "next/link";
import classNames from "classnames";

import styles from "news-site-css/dist/navbar.module.css";

export default function NavListItem({ id, label, url, callback, itemClass, isActive }) {
    return (
        <li className={classNames(styles["navbar-item"], itemClass)} onClick={callback}>
            <Link href={url} id={id} className={classNames({ [styles.active]: isActive })}>
                {label}
            </Link>
        </li>
    );
}
