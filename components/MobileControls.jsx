import styles from '../styles/MobileControls.module.css';

export default function MobileControls({ onLeft, onRight, onDown, onRotate, onHardDrop }) {
  return (
    <div className={styles.controls}>
      <div className={styles.row}>
        <button className={styles.btn} onClick={onRotate}>↑ ROTATE</button>
        <button className={styles.btn} onClick={onHardDrop}>DROP</button>
      </div>
      <div className={styles.row}>
        <button className={styles.btn} onClick={onLeft}>◀ LEFT</button>
        <button className={styles.btn} onClick={onDown}>▼ DOWN</button>
        <button className={styles.btn} onClick={onRight}>RIGHT ▶</button>
      </div>
    </div>
  );
}
