import { useMemo } from 'react';
import { placePiece } from '../utils/gameLogic';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../utils/constants';
import styles from '../styles/GameBoard.module.css';

export default function GameBoard({ board, currentPiece, pos, ghost }) {
  const renderedBoard = useMemo(() => {
    let display = board.map(row => [...row]);

    // Draw ghost
    if (currentPiece && ghost) {
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
          if (currentPiece.shape[r][c]) {
            const gr = ghost.y + r;
            const gc = ghost.x + c;
            if (gr >= 0 && gr < BOARD_HEIGHT && gc >= 0 && gc < BOARD_WIDTH) {
              if (display[gr][gc] === null) {
                display[gr][gc] = '-'; // ghost marker
              }
            }
          }
        }
      }
    }

    // Draw current piece
    if (currentPiece) {
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
          if (currentPiece.shape[r][c]) {
            const br = pos.y + r;
            const bc = pos.x + c;
            if (br >= 0 && br < BOARD_HEIGHT && bc >= 0 && bc < BOARD_WIDTH) {
              display[br][bc] = currentPiece.char;
            }
          }
        }
      }
    }

    return display;
  }, [board, currentPiece, pos, ghost]);

  return (
    <div className={styles.boardWrapper}>
      <pre className={styles.board}>
        {renderedBoard.map((row, r) => (
          <div key={r} className={styles.row}>
            {row.map((cell, c) => (
              <span
                key={c}
                className={`${styles.cell} ${cell === null ? styles.empty : cell === '-' ? styles.ghost : styles.filled}`}
              >
                {cell === null ? '·' : cell === '-' ? '·' : cell}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  );
}
