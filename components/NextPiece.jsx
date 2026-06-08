import styles from '../styles/NextPiece.module.css';

export default function NextPiece({ nextPiece }) {
  if (!nextPiece) return null;

  const previewSize = 4;
  const grid = Array.from({ length: previewSize }, () => Array(previewSize).fill(null));

  // Center the piece
  const offsetR = Math.floor((previewSize - nextPiece.shape.length) / 2);
  const offsetC = Math.floor((previewSize - nextPiece.shape[0].length) / 2);

  for (let r = 0; r < nextPiece.shape.length; r++) {
    for (let c = 0; c < nextPiece.shape[r].length; c++) {
      if (nextPiece.shape[r][c]) {
        const gr = offsetR + r;
        const gc = offsetC + c;
        if (gr >= 0 && gr < previewSize && gc >= 0 && gc < previewSize) {
          grid[gr][gc] = nextPiece.char;
        }
      }
    }
  }

  return (
    <div className={styles.nextPiece}>
      <pre className={styles.preview}>
        {grid.map((row, r) => (
          <div key={r} className={styles.row}>
            {row.map((cell, c) => (
              <span key={c} className={`${styles.cell} ${cell ? styles.filled : styles.empty}`}>
                {cell || ' '}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  );
}
