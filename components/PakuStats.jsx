import styles from '../styles/PakuStats.module.css';

// Pixel-art heart — matches the 8-bit reference image
// Each pixel = 2x2 units in a 24x24 viewBox (12x12 pixel grid)
function PixelHeart({ size = 18 }) {
  const P = 2; // pixel size
  // Row by row pixel map (1=bright red, 2=dark red, 3=black, 4=white highlight)
  // 12 cols × 11 rows
  const rows = [
    [0,0,3,3,0,0,0,3,3,0,0,0],
    [0,3,1,1,3,0,3,1,1,3,0,0],
    [3,1,1,1,1,3,1,1,1,1,3,0],
    [3,1,1,1,1,1,1,1,4,4,1,3],
    [3,1,1,1,1,1,1,1,4,1,1,3],
    [3,1,1,1,1,1,1,1,1,1,1,3],
    [0,3,1,2,1,1,1,1,1,1,3,0],
    [0,0,3,1,2,1,1,1,1,3,0,0],
    [0,0,0,3,1,2,1,1,3,0,0,0],
    [0,0,0,0,3,1,2,3,0,0,0,0],
    [0,0,0,0,0,3,3,0,0,0,0,0],
  ];

  const colorMap = {
    1: '#e00000',
    2: '#8b0000',
    3: '#000000',
    4: '#ffffff',
  };

  const gridW = 12, gridH = rows.length;
  const vbW = gridW * P, vbH = gridH * P;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vbW} ${vbH}`}
      style={{ imageRendering: 'pixelated', display: 'inline-block', verticalAlign: 'middle' }}
    >
      {rows.map((row, r) =>
        row.map((val, c) => {
          if (!val) return null;
          return (
            <rect
              key={`${r}-${c}`}
              x={c * P} y={r * P}
              width={P} height={P}
              fill={colorMap[val]}
            />
          );
        })
      )}
    </svg>
  );
}

export default function PakuStats({ score, lives, dotsLeft }) {
  return (
    <div className={styles.stats}>
      <div className={styles.statRow}>
        <span className={styles.label}>SCORE</span>
        <span className={styles.value}>{score}</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>LIVES</span>
        <span className={styles.lives}>
          {Array.from({ length: lives }).map((_, i) => (
            <PixelHeart key={i} size={18} />
          ))}
        </span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>DOTS</span>
        <span className={styles.value}>{dotsLeft}</span>
      </div>
    </div>
  );
}