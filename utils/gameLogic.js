import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOES, TETROMINO_KEYS } from './constants';

export function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));
}

export function randomTetromino() {
  const key = TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
  const t = TETROMINOES[key];
  return { key, shape: t.shape.map(r => [...r]) };
}

export function rotatePiece(shape) {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = shape[r][c];
    }
  }
  return rotated;
}

export function isValidPosition(board, shape, pos) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const newR = pos.y + r;
      const newC = pos.x + c;
      if (newR < 0 || newR >= BOARD_HEIGHT || newC < 0 || newC >= BOARD_WIDTH) return false;
      if (board[newR][newC] !== null) return false;
    }
  }
  return true;
}

export function placePiece(board, shape, pos, key) {
  const newBoard = board.map(row => [...row]);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        newBoard[pos.y + r][pos.x + c] = key;
      }
    }
  }
  return newBoard;
}

export function clearLines(board) {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const cleared = BOARD_HEIGHT - newBoard.length;
  const emptyRows = Array.from({ length: cleared }, () => Array(BOARD_WIDTH).fill(null));
  return { board: [...emptyRows, ...newBoard], linesCleared: cleared };
}

export function getGhostPosition(board, shape, pos) {
  let ghostY = pos.y;
  while (isValidPosition(board, shape, { x: pos.x, y: ghostY + 1 })) {
    ghostY++;
  }
  return { x: pos.x, y: ghostY };
}

export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}