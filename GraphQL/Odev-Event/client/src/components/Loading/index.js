import { Spin } from "antd";

import styles from "./styles.module.css";

function Loading() {
    return (
        <div className={styles.spin}>
            <Spin delay={200} size="large" />
        </div>
    );
}

export default Loading;
