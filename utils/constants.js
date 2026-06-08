export const BOARD_WIDTH = 60;
export const BOARD_HEIGHT = 30;

export const TETROMINOES = {
  O: {
    char: 'O',
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  I: {
    char: 'I',
    shape: [[1, 1, 1, 1]],
  },
  T: {
    char: 'T',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  S: {
    char: 'S',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  Z: {
    char: 'Z',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  J: {
    char: 'J',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  L: {
    char: 'L',
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  Y: {
    char: 'Y',
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  },
  R: {
    char: 'R',
    shape: [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ],
  },
  A: {
    char: 'A',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
  },
};

export const TETROMINO_KEYS = Object.keys(TETROMINOES);

export const LEVEL_SPEEDS = [
  800, 720, 640, 560, 480, 400, 320, 240, 160, 80,
];

export const POINTS_PER_LINE = [0, 100, 300, 500, 800];

export const GAMES = ['TEXTRIS', 'SNEKST', 'PAKKU'];

export const INITIAL_HIGHSCORES = [
  { name: 'ARM', score: 29113 },
  { name: 'NRT', score: 19014 },
  { name: 'CSS', score: 15254 },
  { name: 'NRT', score: 14558 },
  { name: 'MKO', score: 14284 },
  { name: 'AAA', score: 12501 },
  { name: 'NRT', score: 11281 },
  { name: 'TEO', score: 11053 },
  { name: 'AAA', score: 7906 },
  { name: 'ASS', score: 7305 },
];

export const GRAND_CHAMPIONS = [
  { name: 'SAL', score: 338022 },
  { name: 'SAL', score: 234306 },
  { name: 'SAL', score: 145251 },
];
