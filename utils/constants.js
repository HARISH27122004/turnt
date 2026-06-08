export const BOARD_WIDTH = 20;
export const BOARD_HEIGHT = 22;

export const PIECE_COLORS = {
  O: '#f5e642',  // yellow
  I: '#42d4f5',  // cyan
  T: '#a542f5',  // purple
  S: '#42f55a',  // green
  Z: '#f54242',  // red
  J: '#4269f5',  // blue
  L: '#f59e42',  // orange
  Y: '#f542b8',  // pink
  R: '#42f5d4',  // teal
  A: '#f5a142',  // amber
};

export const GHOST_COLORS = {
  O: '#5a5410',
  I: '#104a5a',
  T: '#3a1060',
  S: '#10601a',
  Z: '#601010',
  J: '#101e60',
  L: '#603a10',
  Y: '#601040',
  R: '#106050',
  A: '#603810',
};

export const TETROMINOES = {
  O: {
    key: 'O',
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  I: {
    key: 'I',
    shape: [[1, 1, 1, 1]],
  },
  T: {
    key: 'T',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  S: {
    key: 'S',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  Z: {
    key: 'Z',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  J: {
    key: 'J',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  L: {
    key: 'L',
    shape: [
      [0, 0, 1],
      [1, 1, 1],
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