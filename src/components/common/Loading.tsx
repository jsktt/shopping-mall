import styles from './Loading.module.css'

export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.spininer}></div>
            <p>로딩 중...</p>
        </div>
    );
}

