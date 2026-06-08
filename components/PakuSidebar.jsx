import styles from '../styles/PakuSidebar.module.css';
import { INITIAL_PAKU_HIGHSCORES } from '../utils/pakuConstants';

export default function PakuSidebar({ highscores, gameOver, score, onRestart, paused, onPause }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>PAKKU</div>

      <ol className={styles.scoreList}>
        {(highscores || INITIAL_PAKU_HIGHSCORES).map((entry, i) => (
          <li key={i} className={styles.scoreItem}>
            <span className={styles.rank}>{i + 1}.</span>
            <span className={styles.name}>{entry.name}</span>
            <span className={styles.score}>{entry.score}</span>
          </li>
        ))}
      </ol>

      {!gameOver && (
        <div className={styles.controls}>
          <button className={styles.pauseBtn} onClick={onPause}>
            {paused ? '[RESUME]' : '[PAUSE]'}
          </button>
        </div>
      )}

      <div className={styles.hint}>[!]</div>
    </div>
  );
}
