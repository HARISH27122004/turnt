import { useState } from 'react';
import styles from '../styles/GameMenu.module.css';
import { GAMES, INITIAL_HIGHSCORES, GRAND_CHAMPIONS } from '../utils/constants';

export default function GameMenu({ onStartGame, highscores }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setSelectedIndex(i => Math.max(0, i - 1));
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex(i => Math.min(GAMES.length - 1, i + 1));
    } else if (e.key === 'Enter') {
      if (GAMES[selectedIndex] === 'TEXTRIS') {
        onStartGame();
      }
    }
  };

  return (
    <div className={styles.menuLayout} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Left: Game Select */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>PLAY</div>
        <ul className={styles.gameList}>
          {GAMES.map((game, i) => (
            <li
              key={game}
              className={`${styles.gameItem} ${i === selectedIndex ? styles.active : ''}`}
              onClick={() => {
                setSelectedIndex(i);
                if (game === 'TEXTRIS') onStartGame();
              }}
            >
              <span className={styles.bullet}>{i === selectedIndex ? '●' : '○'}</span>
              {game}
            </li>
          ))}
        </ul>
        <div className={styles.instructions}>
          <div>ARROWS TO SELECT</div>
          <div>ENTER TO PLAY</div>
        </div>
      </div>

      {/* Center: Highscores */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>HIGHSCORES</div>
        <ol className={styles.scoreList}>
          {(highscores || INITIAL_HIGHSCORES).map((entry, i) => (
            <li key={i} className={styles.scoreItem}>
              <span className={styles.rank}>{i + 1}.</span>
              <span className={styles.scoreName}>{entry.name}</span>
              <span className={styles.scoreValue}>{entry.score}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Right: Grand Champions */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>GRAND CHAMPIONS</div>
        <ol className={styles.scoreList}>
          {GRAND_CHAMPIONS.map((entry, i) => (
            <li key={i} className={styles.scoreItem}>
              <span className={styles.rank}>{i + 1}.</span>
              <span className={styles.scoreName}>{entry.name}</span>
              <span className={styles.scoreValue}>{entry.score}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
