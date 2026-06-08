import { PIECE_COLORS } from '../utils/constants';
import styles from '../styles/NextPiece.module.css';

export default function NextPiece({ nextPiece }) {
  if (!nextPiece) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>NEXT</div>
      <div className={styles.preview}>
        {nextPiece.shape.map((row, r) => (
          <div key={r} className={styles.row}>
            {row.map((cell, c) => (
              <div
                key={c}
                className={cell ? styles.block : styles.empty}
                style={cell ? { backgroundColor: PIECE_COLORS[nextPiece.key] } : {}}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}