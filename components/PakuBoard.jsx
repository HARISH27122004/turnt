import { useMemo } from 'react';
import { CELL } from '../utils/pakuConstants';
import styles from '../styles/PakuBoard.module.css';

const CELL_SIZE = 22;

export default function PakuBoard({ maze, pacman, ghosts, gameOver, won, onRestart }) {
  const rows = maze.length;
  const cols = maze[0].length;

  const ghostMap = useMemo(() => {
    const m = new Map();
    ghosts.forEach(g => {
      if (!g.eaten) m.set(`${g.x},${g.y}`, g);
    });
    return m;
  }, [ghosts]);

  // Pac-Man mouth angle based on direction
  const mouthAngle = pacman.mouth ? 40 : 5;
  const dirAngle = pacman.dir.x === 1 ? 0 : pacman.dir.x === -1 ? 180 : pacman.dir.y === -1 ? 270 : 90;

  const w = cols * CELL_SIZE;
  const h = rows * CELL_SIZE;

  return (
    <div className={styles.boardWrapper}>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={styles.board}
      >
        {/* Cells */}
        {maze.map((row, r) =>
          row.map((cell, c) => {
            const cx = c * CELL_SIZE + CELL_SIZE / 2;
            const cy = r * CELL_SIZE + CELL_SIZE / 2;
            const key = `${c},${r}`;

            if (cell === CELL.WALL) {
              return (
                <rect
                  key={key}
                  x={c * CELL_SIZE} y={r * CELL_SIZE}
                  width={CELL_SIZE} height={CELL_SIZE}
                  className={styles.wall}
                />
              );
            }
            return (
              <rect
                key={key}
                x={c * CELL_SIZE} y={r * CELL_SIZE}
                width={CELL_SIZE} height={CELL_SIZE}
                className={styles.empty}
              />
            );
          })
        )}

        {/* Dots */}
        {maze.map((row, r) =>
          row.map((cell, c) => {
            const cx = c * CELL_SIZE + CELL_SIZE / 2;
            const cy = r * CELL_SIZE + CELL_SIZE / 2;
            if (cell === CELL.DOT) {
              return <circle key={`d${c},${r}`} cx={cx} cy={cy} r={2} className={styles.dot} />;
            }
            if (cell === CELL.POWER) {
              return <circle key={`p${c},${r}`} cx={cx} cy={cy} r={5} className={styles.power} />;
            }
            return null;
          })
        )}

        {/* Ghosts */}
        {ghosts.map((g, i) => {
          if (g.eaten) return null;
          const gx = g.x * CELL_SIZE + CELL_SIZE / 2;
          const gy = g.y * CELL_SIZE + CELL_SIZE / 2;
          const r = CELL_SIZE / 2 - 2;
          const color = g.frightened ? '#1a1aff' : g.color;

          return (
            <g key={i} transform={`translate(${gx},${gy})`}>
              {/* Ghost body */}
              <path
                d={`M${-r},0 A${r},${r} 0 0,1 ${r},0 L${r},${r} L${r*0.6},${r*0.65} L${r*0.2},${r} L${-r*0.2},${r*0.65} L${-r*0.6},${r} L${-r},${r} Z`}
                fill={color}
                opacity={g.frightened ? 0.8 : 1}
              />
              {!g.frightened && (
                <>
                  <circle cx={-r*0.35} cy={-r*0.15} r={r*0.28} fill="white" />
                  <circle cx={r*0.35}  cy={-r*0.15} r={r*0.28} fill="white" />
                  <circle cx={-r*0.25} cy={-r*0.1}  r={r*0.14} fill="#222" />
                  <circle cx={r*0.45}  cy={-r*0.1}  r={r*0.14} fill="#222" />
                </>
              )}
              {g.frightened && (
                <>
                  <circle cx={-r*0.3} cy={-r*0.1} r={r*0.15} fill="white" />
                  <circle cx={r*0.3}  cy={-r*0.1} r={r*0.15} fill="white" />
                  <path d={`M${-r*0.5},${r*0.3} Q${-r*0.2},${r*0.1} 0,${r*0.3} Q${r*0.2},${r*0.1} ${r*0.5},${r*0.3}`} stroke="white" strokeWidth="1.5" fill="none" />
                </>
              )}
            </g>
          );
        })}

        {/* Pac-Man */}
        {(() => {
          const px = pacman.x * CELL_SIZE + CELL_SIZE / 2;
          const py = pacman.y * CELL_SIZE + CELL_SIZE / 2;
          const r = CELL_SIZE / 2 - 2;
          const startAngle = (dirAngle + mouthAngle) * Math.PI / 180;
          const endAngle   = (dirAngle - mouthAngle) * Math.PI / 180;
          const x1 = px + r * Math.cos(startAngle);
          const y1 = py + r * Math.sin(startAngle);
          const x2 = px + r * Math.cos(endAngle);
          const y2 = py + r * Math.sin(endAngle);
          const largeArc = (360 - mouthAngle * 2) > 180 ? 1 : 0;

          return (
            <path
              d={`M${px},${py} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
              className={styles.pacman}
            />
          );
        })()}

        {/* Game Over overlay */}
        {(gameOver || won) && (
          <g>
            <rect x={0} y={0} width={w} height={h} fill="rgba(0,0,0,0.82)" />
            <text
              x={w / 2} y={h / 2 - 28}
              textAnchor="middle"
              className={styles.gameOverText}
            >
              {won ? 'YOU WIN!' : 'GAME OVER'}
            </text>
            <foreignObject x={w/2 - 70} y={h/2} width={140} height={50}>
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ display:'flex', justifyContent:'center' }}>
                <button className={styles.restartBtnSvg} onClick={onRestart}>▶ RESTART</button>
              </div>
            </foreignObject>
          </g>
        )}
      </svg>
    </div>
  );
}
