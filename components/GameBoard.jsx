import { useMemo } from 'react';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../utils/constants';
import { PIECE_COLORS, GHOST_COLORS } from '../utils/constants';
import styles from '../styles/GameBoard.module.css';

export default function GameBoard({ board, currentPiece, pos, ghost }) {
  const renderedBoard = useMemo(() => {
    // start with board copy: each cell is null or a piece key
    let display = board.map(row => row.map(cell => cell ? { key: cell, type: 'placed' } : null));

    // Draw ghost
    if (currentPiece && ghost) {
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
          if (currentPiece.shape[r][c]) {
            const gr = ghost.y + r;
            const gc = ghost.x + c;
            if (gr >= 0 && gr < BOARD_HEIGHT && gc >= 0 && gc < BOARD_WIDTH) {
              if (!display[gr][gc]) {
                display[gr][gc] = { key: currentPiece.key, type: 'ghost' };
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
              display[br][bc] = { key: currentPiece.key, type: 'active' };
            }
          }
        }
      }
    }

    return display;
  }, [board, currentPiece, pos, ghost]);

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board}>
        {renderedBoard.map((row, r) => (
          <div key={r} className={styles.row}>
            {row.map((cell, c) => {
              if (!cell) {
                return <div key={c} className={styles.empty} />;
              }
              if (cell.type === 'ghost') {
                return (
                  <div
                    key={c}
                    className={styles.ghost}
                    style={{ borderColor: PIECE_COLORS[cell.key] }}
                  />
                );
              }
              return (
                <div
                  key={c}
                  className={styles.block}
                  style={{ backgroundColor: PIECE_COLORS[cell.key] }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}