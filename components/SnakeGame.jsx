import { useEffect, useCallback } from 'react';
import useSnake from '../hooks/useSnake';
import SnakeBoard from './SnakeBoard';
import SnakeStats from './SnakeStats';
import SnakeSidebar from './SnakeSidebar';
import SnakeMobileControls from './SnakeMobileControls';
import styles from '../styles/SnakeGame.module.css';
import { DIRECTIONS } from '../utils/snakeConstants';

export default function SnakeGame({ onBack }) {
  const {
    snake, food,
    score, foodEaten, currentSpeed,
    running, gameOver, time,
    highscores,
    startGame, pauseGame, changeDirection,
  } = useSnake();

  useEffect(() => { startGame(); }, []);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowUp': e.preventDefault(); changeDirection(DIRECTIONS.UP); break;
      case 'ArrowDown': e.preventDefault(); changeDirection(DIRECTIONS.DOWN); break;
      case 'ArrowLeft': e.preventDefault(); changeDirection(DIRECTIONS.LEFT); break;
      case 'ArrowRight': e.preventDefault(); changeDirection(DIRECTIONS.RIGHT); break;
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
        <SnakeSidebar
          highscores={highscores}
          gameOver={gameOver}
          score={score}
          onRestart={startGame}
          paused={!running && !gameOver}
          onPause={pauseGame}
        />
      </div>

      <div className={styles.boardArea}>
        {!running && !gameOver && (
          <div className={styles.pauseOverlay}>PAUSED</div>
        )}
        <SnakeBoard
          snake={snake}
          food={food}
          gameOver={gameOver}
          onRestart={startGame}
        />
      </div>

      <div className={styles.rightPanel}>
        <SnakeStats
          score={score}
          foodEaten={foodEaten}
          currentSpeed={currentSpeed}
          time={time}
        />
      </div>

      <div className={styles.mobileControlsArea}>
        <SnakeMobileControls
          onUp={() => changeDirection(DIRECTIONS.UP)}
          onDown={() => changeDirection(DIRECTIONS.DOWN)}
          onLeft={() => changeDirection(DIRECTIONS.LEFT)}
          onRight={() => changeDirection(DIRECTIONS.RIGHT)}
        />
      </div>
    </div>
  );
}
