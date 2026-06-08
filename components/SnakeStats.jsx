import { formatTime } from '../utils/gameLogic';
import styles from '../styles/SnakeStats.module.css';

export default function SnakeStats({ score, foodEaten, currentSpeed, time }) {
  const speedLevel = foodEaten + 1;
  const speedDisplay = (1 + foodEaten * 0.1).toFixed(1);

  return (
    <div className={styles.stats}>
      <div className={styles.statRow}>
        <span className={styles.label}>SCORE</span>
        <span className={styles.value}>{score}</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>FOOD</span>
        <span className={styles.value}>{foodEaten}</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>SPEED</span>
        <span className={styles.value}>{speedDisplay}x</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>TIME</span>
        <span className={styles.value}>{formatTime(time)}</span>
      </div>
    </div>
  );
}
