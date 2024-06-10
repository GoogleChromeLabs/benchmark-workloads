import TitleIcon from "@/assets/title-icon";

import styles from "news-site-css/dist/header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className={styles["page-header"]}>
            <NavLink to="/" className={styles["page-header-title"]}>
                <TitleIcon />
            </NavLink>
        </header>
    );
}
