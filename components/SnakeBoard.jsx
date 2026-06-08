import { useMemo } from 'react';
import { SNAKE_COLS, SNAKE_ROWS, SNAKE_COLOR, SNAKE_HEAD_COLOR, FOOD_COLOR } from '../utils/snakeConstants';
import styles from '../styles/SnakeBoard.module.css';

export default function SnakeBoard({ snake, food }) {
  const snakeSet = useMemo(() => {
    const set = new Set();
    snake.forEach((seg, i) => set.set ? null : null);
    return snake;
  }, [snake]);

  const headKey = snake.length > 0 ? `${snake[0].x},${snake[0].y}` : '';
  const snakeMap = useMemo(() => {
    const m = new Map();
    snake.forEach((seg, i) => m.set(`${seg.x},${seg.y}`, i));
    return m;
  }, [snake]);

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board}>
        {Array.from({ length: SNAKE_ROWS }, (_, r) => (
          <div key={r} className={styles.row}>
            {Array.from({ length: SNAKE_COLS }, (_, c) => {
              const key = `${c},${r}`;
              const isFood = food.x === c && food.y === r;
              const snakeIdx = snakeMap.get(key);
              const isHead = snakeIdx === 0;
              const isSnake = snakeIdx !== undefined;

              if (isFood) {
                return <div key={c} className={styles.food} />;
              }
              if (isHead) {
                return <div key={c} className={styles.head} />;
              }
              if (isSnake) {
                // Fade tail slightly
                const opacity = Math.max(0.5, 1 - snakeIdx / snake.length * 0.4);
                return (
                  <div
                    key={c}
                    className={styles.snake}
                    style={{ opacity }}
                  />
                );
              }
              return <div key={c} className={styles.empty} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
