export const SNAKE_COLS = 25;
export const SNAKE_ROWS = 25;

export const DIRECTIONS = {
  UP:    { x: 0,  y: -1 },
  DOWN:  { x: 0,  y:  1 },
  LEFT:  { x: -1, y:  0 },
  RIGHT: { x: 1,  y:  0 },
};

export const BASE_SPEED = 200;      // ms per tick at start
export const SPEED_INCREASE = 0.1;  // multiplier reduction per food eaten
// speed after n food = BASE_SPEED / (1 + n * SPEED_INCREASE)

export const SNAKE_COLOR = '#42f55a';
export const SNAKE_HEAD_COLOR = '#a8ffb8';
export const FOOD_COLOR = '#f54242';
export const FOOD_GLOW = '#ff6060';

export const SNAKE_HIGHSCORES_KEY = 'snekst_highscores';

export const INITIAL_SNAKE_HIGHSCORES = [
  { name: 'ARM', score: 48 },
  { name: 'NRT', score: 35 },
  { name: 'CSS', score: 29 },
  { name: 'MKO', score: 22 },
  { name: 'AAA', score: 18 },
  { name: 'TEO', score: 14 },
  { name: 'NRT', score: 11 },
  { name: 'AAA', score: 9 },
  { name: 'ASS', score: 7 },
  { name: 'ZZZ', score: 4 },
];