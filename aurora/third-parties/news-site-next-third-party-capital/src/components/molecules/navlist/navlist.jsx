import { useDataContext } from "@/context/data-context";
import Dropdown from "@/components/atoms/dropdown/dropdown";
import NavListItem from "@/partials/navlist-item/navlist-item";
import { usePathname } from "next/navigation";

import styles from "news-site-css/dist/navbar.module.css";

export default function NavList({ callback, id }) {
    const { buttons, pages } = useDataContext();
    const pathname = usePathname();

    const navItems = [];
    const dropdownItems = [];

    Object.keys(pages).forEach((key) => {
        if (pages[key].priority === 1)
            navItems.push(key);
        else if (pages[key].priority === 2)
            dropdownItems.push(key);
    });

    return (
        <ul className={styles["navbar-list"]}>
            {navItems.map((key) => <NavListItem id={`${id}-${key}-link`} key={key} label={pages[key].name} url={pages[key].url} callback={callback} isActive={pathname.split("/")[1] === key} />
            )}
            {dropdownItems.length > 0
                ? <li className={styles["navbar-item"]}>
                    <Dropdown animatedIconClass={styles["navbar-label-icon"]} label={buttons.more.label}>
                        {dropdownItems.map((key) =>
                            <NavListItem id={`${id}-${key}-link`} key={key} label={pages[key].name} url={pages[key].url} callback={callback} itemClass={styles["navbar-dropdown-item"]} isActive={pathname.split("/")[1] === key} />
                        )}
                    </Dropdown>
                </li>
                : null}
        </ul>
    );
}
