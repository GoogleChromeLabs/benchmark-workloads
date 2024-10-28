import classNames from "classnames";

import styles from "news-site-css/dist/advertisement.module.css";

export default function Ad({ data, location }) {
    const source = `${data.src}?w=${data.width}&h=${data.height}`;

    return (
        <div className={classNames(styles["advertisement-container"], styles[`advertisement-container-${location}`])}>
            <div className={classNames(styles["advertisement-iframe"], styles[`advertisement-${data.width}x${data.height}`])}>
                <div className={styles["advertisement-content"]}>
                    <iframe src={source} width={data.width} height={data.height}></iframe>
                </div>
            </div>
            <div className={styles["advertisement-notice"]}>Advertisement</div>
        </div>
    );
}
