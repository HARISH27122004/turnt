import { useEffect, useCallback } from 'react';
import useTextris from '../hooks/useTextris';
import GameBoard from './GameBoard';
import GameStats from './GameStats';
import NextPiece from './NextPiece';
import ScoresSidebar from './ScoresSidebar';
import MobileControls from './MobileControls';
import styles from '../styles/TextrisGame.module.css';

export default function TextrisGame({ onBack }) {
  const {
    board, currentPiece, nextPiece, pos, ghost,
    score, level, lines, time,
    running, gameOver, highscores,
    startGame, pauseGame,
    moveLeft, moveRight, moveDown, rotate, hardDrop,
  } = useTextris();

  useEffect(() => { startGame(); }, []);

  const handleKeyDown = useCallback((e) => {
    if (gameOver) return;
    switch (e.key) {
      case 'ArrowLeft':  e.preventDefault(); moveLeft();   break;
      case 'ArrowRight': e.preventDefault(); moveRight();  break;
      case 'ArrowDown':  e.preventDefault(); moveDown();   break;
      case 'ArrowUp':    e.preventDefault(); rotate();     break;
      case ' ':          e.preventDefault(); hardDrop();   break;
      case 'p': case 'P': pauseGame(); break;
      case 'Escape': onBack && onBack(); break;
    }
  }, [gameOver, moveLeft, moveRight, moveDown, rotate, hardDrop, pauseGame, onBack]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.gameLayout}>
      <div className={styles.sidebarArea}>
        <ScoresSidebar
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
        <GameBoard board={board} currentPiece={currentPiece} pos={pos} ghost={ghost} />
      </div>

      <div className={styles.rightPanel}>
        <GameStats score={score} level={level} lines={lines} time={time} />
        <NextPiece nextPiece={nextPiece} />
      </div>

      <div className={styles.mobileControlsArea}>
        <MobileControls
          onLeft={moveLeft}
          onRight={moveRight}
          onDown={moveDown}
          onRotate={rotate}
          onHardDrop={hardDrop}
        />
      </div>
    </div>
  );
}
