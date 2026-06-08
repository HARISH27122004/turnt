import styles from '../styles/ScoresSidebar.module.css';
import { INITIAL_HIGHSCORES } from '../utils/constants';

export default function ScoresSidebar({ highscores, gameOver, score, onRestart, paused, onPause }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>TEXTRIS</div>

      <ol className={styles.scoreList}>
        {(highscores || INITIAL_HIGHSCORES).map((entry, i) => (
          <li key={i} className={styles.scoreItem}>
            <span className={styles.rank}>{i + 1}.</span>
            <span className={styles.name}>{entry.name}</span>
            <span className={styles.score}>{entry.score}</span>
          </li>
        ))}
      </ol>

      {gameOver && (
        <div className={styles.gameOver}>
          <div className={styles.gameOverText}>[GAME OVER]</div>
          <div className={styles.finalScore}>SCORE: {score}</div>
          <button className={styles.restartBtn} onClick={onRestart}>
            [RESTART]
          </button>
        </div>
      )}

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
