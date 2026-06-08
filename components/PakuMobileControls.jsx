import styles from '../styles/PakuMobileControls.module.css';

export default function PakuMobileControls({ onUp, onDown, onLeft, onRight }) {
  return (
    <div className={styles.controls}>
      <div className={styles.row}>
        <button className={styles.btn} onClick={onUp}>▲</button>
      </div>
      <div className={styles.row}>
        <button className={styles.btn} onClick={onLeft}>◀</button>
        <button className={`${styles.btn} ${styles.spacer}`} disabled />
        <button className={styles.btn} onClick={onRight}>▶</button>
      </div>
      <div className={styles.row}>
        <button className={styles.btn} onClick={onDown}>▼</button>
      </div>
    </div>
  );
}
