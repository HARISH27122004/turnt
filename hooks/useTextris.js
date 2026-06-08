import { useState, useEffect, useCallback, useRef } from 'react';
import {
  createEmptyBoard, randomTetromino, rotatePiece,
  isValidPosition, placePiece, clearLines, getGhostPosition,
} from '../utils/gameLogic';
import { BOARD_WIDTH, BOARD_HEIGHT, LEVEL_SPEEDS, POINTS_PER_LINE, INITIAL_HIGHSCORES } from '../utils/constants';

export default function useTextris(onGameOver) {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [lines, setLines] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highscores] = useState(INITIAL_HIGHSCORES);

  const boardRef = useRef(board);
  const posRef = useRef(pos);
  const currentPieceRef = useRef(currentPiece);
  const runningRef = useRef(running);
  const scoreRef = useRef(score);
  const linesRef = useRef(lines);
  const levelRef = useRef(level);

  boardRef.current = board;
  posRef.current = pos;
  currentPieceRef.current = currentPiece;
  runningRef.current = running;
  scoreRef.current = score;
  linesRef.current = lines;
  levelRef.current = level;

  const spawnPiece = useCallback((next) => {
    const piece = next || randomTetromino();
    const startX = Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2);
    const startPos = { x: startX, y: 0 };

    if (!isValidPosition(boardRef.current, piece.shape, startPos)) {
      setRunning(false);
      setGameOver(true);
      return;
    }

    setCurrentPiece(piece);
    setPos(startPos);
    setNextPiece(randomTetromino());
  }, []);

  const lockPiece = useCallback(() => {
    const piece = currentPieceRef.current;
    const p = posRef.current;
    if (!piece) return;

    const newBoard = placePiece(boardRef.current, piece.shape, p, piece.key);
    const { board: clearedBoard, linesCleared } = clearLines(newBoard);

    const newLines = linesRef.current + linesCleared;
    const newLevel = Math.floor(newLines / 10);
    const points = POINTS_PER_LINE[linesCleared] * (newLevel + 1);
    const newScore = scoreRef.current + points;

    setBoard(clearedBoard);
    setLines(newLines);
    setLevel(newLevel);
    setScore(newScore);
    setCurrentPiece(null);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running || !currentPiece) return;
    const speed = LEVEL_SPEEDS[Math.min(level, LEVEL_SPEEDS.length - 1)];
    const id = setInterval(() => {
      const newPos = { x: posRef.current.x, y: posRef.current.y + 1 };
      if (isValidPosition(boardRef.current, currentPieceRef.current.shape, newPos)) {
        setPos(newPos);
      } else {
        lockPiece();
      }
    }, speed);
    return () => clearInterval(id);
  }, [running, currentPiece, level, lockPiece]);

  useEffect(() => {
    if (running && !currentPiece && !gameOver) {
      spawnPiece(nextPiece);
    }
  }, [currentPiece, running, gameOver, nextPiece, spawnPiece]);

  const moveLeft = useCallback(() => {
    const newPos = { x: posRef.current.x - 1, y: posRef.current.y };
    if (currentPieceRef.current && isValidPosition(boardRef.current, currentPieceRef.current.shape, newPos))
      setPos(newPos);
  }, []);

  const moveRight = useCallback(() => {
    const newPos = { x: posRef.current.x + 1, y: posRef.current.y };
    if (currentPieceRef.current && isValidPosition(boardRef.current, currentPieceRef.current.shape, newPos))
      setPos(newPos);
  }, []);

  const moveDown = useCallback(() => {
    const newPos = { x: posRef.current.x, y: posRef.current.y + 1 };
    if (currentPieceRef.current && isValidPosition(boardRef.current, currentPieceRef.current.shape, newPos)) {
      setPos(newPos);
      setScore(s => s + 1);
    } else {
      lockPiece();
    }
  }, [lockPiece]);

  const rotate = useCallback(() => {
    if (!currentPieceRef.current) return;
    const rotated = rotatePiece(currentPieceRef.current.shape);
    if (isValidPosition(boardRef.current, rotated, posRef.current))
      setCurrentPiece(p => ({ ...p, shape: rotated }));
  }, []);

  const hardDrop = useCallback(() => {
    if (!currentPieceRef.current) return;
    let dropPos = { ...posRef.current };
    while (isValidPosition(boardRef.current, currentPieceRef.current.shape, { ...dropPos, y: dropPos.y + 1 }))
      dropPos.y++;
    const dropped = dropPos.y - posRef.current.y;
    setScore(s => s + dropped * 2);
    setPos(dropPos);
    setTimeout(() => lockPiece(), 0);
  }, [lockPiece]);

  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0); setLevel(0); setLines(0); setTime(0);
    setGameOver(false); setCurrentPiece(null);
    setNextPiece(randomTetromino());
    setRunning(true);
  }, []);

  const pauseGame = useCallback(() => setRunning(r => !r), []);

  const ghost = currentPiece ? getGhostPosition(board, currentPiece.shape, pos) : null;

  return {
    board, currentPiece, nextPiece, pos, ghost,
    score, level, lines, time,
    running, gameOver, highscores,
    startGame, pauseGame,
    moveLeft, moveRight, moveDown, rotate, hardDrop,
  };
}