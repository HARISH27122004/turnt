import { useEffect, useCallback } from 'react';
import usePaku from '../hooks/usePaku';
import PakuBoard from './PakuBoard';
import PakuSidebar from './PakuSidebar';
import PakuStats from './PakuStats';
import PakuMobileControls from './PakuMobileControls';
import styles from '../styles/PakuGame.module.css';
import { DIRS } from '../utils/pakuConstants';

export default function PakuGame({ onBack }) {
  const {
    maze, pacman, ghosts,
    score, lives, dotsLeft,
    running, gameOver, won,
    highscores,
    startGame, pauseGame, changeDirection,
  } = usePaku();

  useEffect(() => { startGame(); }, []);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowUp':    e.preventDefault(); changeDirection(DIRS.UP);    break;
      case 'ArrowDown':  e.preventDefault(); changeDirection(DIRS.DOWN);  break;
      case 'ArrowLeft':  e.preventDefault(); changeDirection(DIRS.LEFT);  break;
      case 'ArrowRight': e.preventDefault(); changeDirection(DIRS.RIGHT); break;
      case 'p': case 'P': pauseGame(); break;
      case 'Escape': onBack && onBack(); break;
    }
  }, [changeDirection, pauseGame, onBack]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.gameLayout}>
      <div className={styles.sidebarArea}>
        <PakuSidebar
          highscores={highscores}
          gameOver={gameOver || won}
          score={score}
          onRestart={startGame}
          paused={!running && !gameOver && !won}
          onPause={pauseGame}
        />
      </div>

      <div className={styles.boardArea}>
        {!running && !gameOver && !won && (
          <div className={styles.pauseOverlay}>PAUSED</div>
        )}
        <PakuBoard
          maze={maze}
          pacman={pacman}
          ghosts={ghosts}
          gameOver={gameOver}
          won={won}
          onRestart={startGame}
        />
      </div>

      <div className={styles.rightPanel}>
        <PakuStats score={score} lives={lives} dotsLeft={dotsLeft} />
      </div>

      <div className={styles.mobileControlsArea}>
        <PakuMobileControls
          onUp={() => changeDirection(DIRS.UP)}
          onDown={() => changeDirection(DIRS.DOWN)}
          onLeft={() => changeDirection(DIRS.LEFT)}
          onRight={() => changeDirection(DIRS.RIGHT)}
        />
      </div>
    </div>
  );
}
