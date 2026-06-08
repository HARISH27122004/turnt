import { useState, useEffect, useCallback, useRef } from 'react';
import {
  SNAKE_COLS, SNAKE_ROWS, DIRECTIONS,
  BASE_SPEED, SPEED_INCREASE,
  INITIAL_SNAKE_HIGHSCORES,
} from '../utils/snakeConstants';

function randomFood(snake) {
  const occupied = new Set(snake.map(s => `${s.x},${s.y}`));
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * SNAKE_COLS),
      y: Math.floor(Math.random() * SNAKE_ROWS),
    };
  } while (occupied.has(`${pos.x},${pos.y}`));
  return pos;
}

function getSpeed(foodEaten) {
  // BASE_SPEED ms decreasing each food eaten
  return Math.max(60, BASE_SPEED / (1 + foodEaten * SPEED_INCREASE));
}

export default function useSnake() {
  const initialSnake = [
    { x: 12, y: 12 },
    { x: 11, y: 12 },
    { x: 10, y: 12 },
  ];

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState({ x: 18, y: 12 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [nextDirection, setNextDirection] = useState(DIRECTIONS.RIGHT);
  const [score, setScore] = useState(0);
  const [foodEaten, setFoodEaten] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [highscores, setHighscores] = useState(INITIAL_SNAKE_HIGHSCORES);

  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const nextDirectionRef = useRef(nextDirection);
  const runningRef = useRef(running);
  const foodRef = useRef(food);
  const foodEatenRef = useRef(foodEaten);

  snakeRef.current = snake;
  directionRef.current = direction;
  nextDirectionRef.current = nextDirection;
  runningRef.current = running;
  foodRef.current = food;
  foodEatenRef.current = foodEaten;

  // Timer
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const tick = useCallback(() => {
    const s = snakeRef.current;
    const dir = nextDirectionRef.current;
    const f = foodRef.current;

    setDirection(dir);

    const head = s[0];
    const newHead = { x: head.x + dir.x, y: head.y + dir.y };

    // Wall collision
    if (
      newHead.x < 0 || newHead.x >= SNAKE_COLS ||
      newHead.y < 0 || newHead.y >= SNAKE_ROWS
    ) {
      setRunning(false);
      setGameOver(true);
      return;
    }

    // Self collision
    if (s.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
      setRunning(false);
      setGameOver(true);
      return;
    }

    const ateFood = newHead.x === f.x && newHead.y === f.y;
    let newSnake;

    if (ateFood) {
      newSnake = [newHead, ...s]; // grow — don't remove tail
      const newFoodEaten = foodEatenRef.current + 1;
      setFoodEaten(newFoodEaten);
      setScore(sc => sc + 10 + newFoodEaten);
      setFood(randomFood(newSnake));
    } else {
      newSnake = [newHead, ...s.slice(0, -1)]; // normal move
    }

    setSnake(newSnake);
  }, []);

  // Game loop — interval speed depends on foodEaten
  useEffect(() => {
    if (!running) return;
    const speed = getSpeed(foodEaten);
    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [running, foodEaten, tick]);

  const changeDirection = useCallback((newDir) => {
    const cur = directionRef.current;
    // Prevent reversing
    if (newDir.x === -cur.x && newDir.y === -cur.y) return;
    setNextDirection(newDir);
  }, []);

  const startGame = useCallback(() => {
    const initSnake = [
      { x: 12, y: 12 },
      { x: 11, y: 12 },
      { x: 10, y: 12 },
    ];
    setSnake(initSnake);
    setFood(randomFood(initSnake));
    setDirection(DIRECTIONS.RIGHT);
    setNextDirection(DIRECTIONS.RIGHT);
    setScore(0);
    setFoodEaten(0);
    setTime(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  const pauseGame = useCallback(() => setRunning(r => !r), []);

  const currentSpeed = getSpeed(foodEaten);

  return {
    snake,
    food,
    score,
    foodEaten,
    currentSpeed,
    running,
    gameOver,
    time,
    highscores,
    startGame,
    pauseGame,
    changeDirection,
    DIRECTIONS,
  };
}