import { formatTime } from '../utils/gameLogic';
import styles from '../styles/GameStats.module.css';

export default function GameStats({ score, level, lines, time }) {
  return (
    <div className={styles.stats}>
      <div className={styles.statRow}>
        <span className={styles.label}>SCORE</span>
        <span className={styles.value}>{score}</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>LEVEL</span>
        <span className={styles.value}>{level}</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>LINES</span>
        <span className={styles.value}>{lines}</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>TIME</span>
        <span className={styles.value}>{formatTime(time)}</span>
      </div>
    </div>
  );
}
