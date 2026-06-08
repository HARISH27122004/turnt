import { useState, useEffect, useCallback, useRef } from 'react';
import {
  buildMaze, PACMAN_START, GHOST_STARTS,
  FRIGHTENED_DURATION, GHOST_SPEED, PACMAN_SPEED,
  CELL, DIRS, INITIAL_PAKU_HIGHSCORES,
} from '../utils/pakuConstants';

function countDots(maze) {
  let n = 0;
  maze.forEach(row => row.forEach(c => { if (c === CELL.DOT || c === CELL.POWER) n++; }));
  return n;
}

function canMove(maze, x, y) {
  if (y < 0 || y >= maze.length) return false;
  const cols = maze[0].length;
  const wx = ((x % cols) + cols) % cols;
  return maze[y][wx] !== CELL.WALL;
}

function ghostAI(maze, ghost, pacman, frightened) {
  const dirs = [DIRS.UP, DIRS.DOWN, DIRS.LEFT, DIRS.RIGHT];
  const cols = maze[0].length;

  const valid = dirs.filter(d => {
    const nx = ((ghost.x + d.x) % cols + cols) % cols;
    const ny = ghost.y + d.y;
    if (!canMove(maze, nx, ny)) return false;
    // no reversing
    if (d.x === -ghost.dir.x && d.y === -ghost.dir.y) return false;
    return true;
  });

  if (valid.length === 0) {
    // only option is reverse
    const rev = { x: -ghost.dir.x, y: -ghost.dir.y };
    return rev;
  }

  if (frightened) {
    return valid[Math.floor(Math.random() * valid.length)];
  }

  // Chase: pick dir that minimises distance to pac-man
  let best = valid[0], bestDist = Infinity;
  for (const d of valid) {
    const nx = ((ghost.x + d.x) % cols + cols) % cols;
    const ny = ghost.y + d.y;
    const dist = Math.abs(nx - pacman.x) + Math.abs(ny - pacman.y);
    if (dist < bestDist) { bestDist = dist; best = d; }
  }
  return best;
}

export default function usePaku() {
  const initMaze = () => buildMaze();

  const [maze, setMaze]           = useState(initMaze);
  const [pacman, setPacman]       = useState({ ...PACMAN_START, dir: DIRS.LEFT, nextDir: DIRS.LEFT, mouth: true });
  const [ghosts, setGhosts]       = useState(GHOST_STARTS.map(g => ({ ...g, dir: DIRS.UP, frightened: false, eaten: false })));
  const [score, setScore]         = useState(0);
  const [lives, setLives]         = useState(3);
  const [dotsLeft, setDotsLeft]   = useState(() => countDots(buildMaze()));
  const [running, setRunning]     = useState(false);
  const [gameOver, setGameOver]   = useState(false);
  const [won, setWon]             = useState(false);
  const [frightened, setFrightened] = useState(false);
  const [frightenTimer, setFrightenTimer] = useState(null);
  const [highscores]              = useState(INITIAL_PAKU_HIGHSCORES);

  const mazeRef        = useRef(maze);
  const pacmanRef      = useRef(pacman);
  const ghostsRef      = useRef(ghosts);
  const runningRef     = useRef(running);
  const scoreRef       = useRef(score);
  const dotsLeftRef    = useRef(dotsLeft);
  const frightenedRef  = useRef(frightened);
  const frightenTimerRef = useRef(frightenTimer);

  mazeRef.current       = maze;
  pacmanRef.current     = pacman;
  ghostsRef.current     = ghosts;
  runningRef.current    = running;
  scoreRef.current      = score;
  dotsLeftRef.current   = dotsLeft;
  frightenedRef.current = frightened;
  frightenTimerRef.current = frightenTimer;

  const triggerFrighten = useCallback(() => {
    setFrightened(true);
    setGhosts(gs => gs.map(g => ({ ...g, frightened: !g.eaten })));
    if (frightenTimerRef.current) clearTimeout(frightenTimerRef.current);
    const t = setTimeout(() => {
      setFrightened(false);
      setGhosts(gs => gs.map(g => ({ ...g, frightened: false })));
    }, FRIGHTENED_DURATION);
    setFrightenTimer(t);
  }, []);

  const resetPositions = useCallback(() => {
    setPacman({ ...PACMAN_START, dir: DIRS.LEFT, nextDir: DIRS.LEFT, mouth: true });
    setGhosts(GHOST_STARTS.map(g => ({ ...g, dir: DIRS.UP, frightened: false, eaten: false })));
    setFrightened(false);
  }, []);

  // Pac-Man tick
  const pacmanTick = useCallback(() => {
    const p = pacmanRef.current;
    const m = mazeRef.current;
    const cols = m[0].length;

    // Try next queued direction first
    let dir = p.dir;
    const nx_next = ((p.x + p.nextDir.x) % cols + cols) % cols;
    const ny_next = p.y + p.nextDir.y;
    if (canMove(m, nx_next, ny_next)) dir = p.nextDir;

    const nx = ((p.x + dir.x) % cols + cols) % cols;
    const ny = p.y + dir.y;

    if (!canMove(m, nx, ny)) {
      // toggle mouth even when stuck
      setPacman(prev => ({ ...prev, mouth: !prev.mouth }));
      return;
    }

    const cell = m[ny][nx];
    let newScore = scoreRef.current;
    let newDotsLeft = dotsLeftRef.current;

    if (cell === CELL.DOT) {
      newScore += 10;
      newDotsLeft--;
      setScore(newScore);
      setDotsLeft(newDotsLeft);
      setMaze(prev => {
        const copy = prev.map(r => [...r]);
        copy[ny][nx] = CELL.EMPTY;
        return copy;
      });
    } else if (cell === CELL.POWER) {
      newScore += 50;
      newDotsLeft--;
      setScore(newScore);
      setDotsLeft(newDotsLeft);
      setMaze(prev => {
        const copy = prev.map(r => [...r]);
        copy[ny][nx] = CELL.EMPTY;
        return copy;
      });
      triggerFrighten();
    }

    if (newDotsLeft <= 0) {
      setRunning(false);
      setWon(true);
      return;
    }

    setPacman(prev => ({ ...prev, x: nx, y: ny, dir, mouth: !prev.mouth }));
  }, [triggerFrighten]);

  // Ghost tick
  const ghostTick = useCallback(() => {
    const p = pacmanRef.current;
    const m = mazeRef.current;
    const cols = m[0].length;
    const isFrightened = frightenedRef.current;

    setGhosts(prev => prev.map(g => {
      if (g.eaten) return g;
      const newDir = ghostAI(m, g, p, isFrightened || g.frightened);
      const nx = ((g.x + newDir.x) % cols + cols) % cols;
      const ny = g.y + newDir.y;
      if (!canMove(m, nx, ny)) return g;
      return { ...g, x: nx, y: ny, dir: newDir };
    }));
  }, []);

  // Collision check (runs every pacman tick via effect)
  useEffect(() => {
    if (!running) return;
    const p = pacman;
    const newGhosts = ghosts.map(g => {
      if (Math.abs(g.x - p.x) <= 1 && g.y === p.y || g.x === p.x && Math.abs(g.y - p.y) <= 1) {
        if (g.x === p.x && g.y === p.y) {
          if (g.frightened) {
            setScore(s => s + 200);
            return { ...g, eaten: true, frightened: false };
          } else if (!g.eaten) {
            // pac-man dies
            setLives(l => {
              const nl = l - 1;
              if (nl <= 0) {
                setRunning(false);
                setGameOver(true);
              } else {
                resetPositions();
              }
              return nl;
            });
          }
        }
      }
      return g;
    });
    setGhosts(newGhosts);
  }, [pacman]);

  // Timers
  useEffect(() => {
    if (!running) return;
    const id = setInterval(pacmanTick, PACMAN_SPEED);
    return () => clearInterval(id);
  }, [running, pacmanTick]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(ghostTick, GHOST_SPEED);
    return () => clearInterval(id);
  }, [running, ghostTick]);

  const changeDirection = useCallback((dir) => {
    setPacman(prev => ({ ...prev, nextDir: dir }));
  }, []);

  const startGame = useCallback(() => {
    const m = buildMaze();
    setMaze(m);
    setDotsLeft(countDots(m));
    setPacman({ ...PACMAN_START, dir: DIRS.LEFT, nextDir: DIRS.LEFT, mouth: true });
    setGhosts(GHOST_STARTS.map(g => ({ ...g, dir: DIRS.UP, frightened: false, eaten: false })));
    setScore(0);
    setLives(3);
    setFrightened(false);
    setGameOver(false);
    setWon(false);
    setRunning(true);
  }, []);

  const pauseGame = useCallback(() => setRunning(r => !r), []);

  return {
    maze, pacman, ghosts,
    score, lives, dotsLeft,
    running, gameOver, won,
    frightened, highscores,
    startGame, pauseGame, changeDirection,
    DIRS,
  };
}
