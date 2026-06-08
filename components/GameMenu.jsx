import { useState, useEffect } from 'react';
import styles from '../styles/GameMenu.module.css';
import { GAMES, INITIAL_HIGHSCORES, GRAND_CHAMPIONS } from '../utils/constants';

export default function GameMenu({ onStartGame, highscores }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        setSelectedIndex(i => Math.max(0, i - 1));
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(i => Math.min(GAMES.length - 1, i + 1));
      } else if (e.key === 'Enter') {
        const game = GAMES[selectedIndex];
        if (game === 'TEXTRIS' || game === 'SNEKST') {
          onStartGame(game);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onStartGame]);

  const handleClick = (game, i) => {
    setSelectedIndex(i);
    if (game === 'TEXTRIS' || game === 'SNEKST') {
      onStartGame(game);
    }
  };

  return (
    <div className={styles.menuLayout}>
      {/* Left: Game Select */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>PLAY</div>
        <ul className={styles.gameList}>
          {GAMES.map((game, i) => (
            <li
              key={game}
              className={`${styles.gameItem} ${i === selectedIndex ? styles.active : ''} ${game === 'PAKKU' ? styles.disabled : ''}`}
              onClick={() => handleClick(game, i)}
            >
              <span className={styles.bullet}>{i === selectedIndex ? '●' : '○'}</span>
              {game}
              {game === 'PAKKU' && <span className={styles.soon}> (SOON)</span>}
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
