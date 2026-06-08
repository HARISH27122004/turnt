export const CELL = {
  EMPTY: 0,
  WALL: 1,
  DOT: 2,
  POWER: 3,
};

export const DIRS = {
  UP:    { x: 0,  y: -1 },
  DOWN:  { x: 0,  y:  1 },
  LEFT:  { x: -1, y:  0 },
  RIGHT: { x: 1,  y:  0 },
};

// 21 cols x 23 rows  — W=wall, .=dot, o=power, ' '=empty
export const LEVEL_MAP = [
  'WWWWWWWWWWWWWWWWWWWWW',
  'W.........W.........W',
  'WoWW.WWW.WW.WWW.WWoW',
  'W...................W',
  'W.WW.W.WWWWW.W.WW.W',
  'W....W...W...W....W',
  'WWWW.WWW W WWW.WWWW',
  '   W.W       W.W   ',
  'WWWW.W WW WW W.WWWW',
  '     .  GHOST  .   ',
  'WWWW.W WWWWWWW W.WWWW',
  '   W.W         W.W   ',
  'WWWW.W WWWWWWW W.WWWW',
  'W.........W.........W',
  'W.WW.WWW.WW.WWW.WW.W',
  'Wo..W.....P.....W..oW',
  'WW.WW.W.WWWWW.W.WW.WW',
  'W....W...W...W....W',
  'W.WWWWWW.W.WWWWWW.W',
  'W...................W',
  'WoWWW.WWW.W.WWW.WWWoW',
  'W.........W.........W',
  'WWWWWWWWWWWWWWWWWWWWW',
];

// Clean numeric maze (23 rows × 21 cols)
export function buildMaze() {
  const rows = 23, cols = 21;
  const maze = Array.from({ length: rows }, () => Array(cols).fill(CELL.WALL));

  // Hand-crafted classic Pac-Man style maze
  const template = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,3,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,2,1],
    [1,2,2,2,2,1,2,2,2,1,1,1,2,2,2,1,2,2,2,2,1],
    [1,1,1,1,2,1,1,1,0,1,1,1,0,1,1,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,0,0,0,0,0,0,0,0,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,1,1,0,0,0,1,1,0,1,2,1,1,1,1],
    [0,0,0,0,2,0,0,1,0,0,0,0,0,1,0,0,2,0,0,0,0],
    [1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,0,0,0,0,0,0,0,0,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
    [1,3,2,1,2,2,2,2,2,2,0,2,2,2,2,2,2,1,2,3,1],
    [1,1,2,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,2,1,1],
    [1,2,2,2,2,1,2,2,2,1,1,1,2,2,2,1,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,3,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,3,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ];

  return template.map(row => [...row]);
}

export const PACMAN_START = { x: 10, y: 15 };

export const GHOST_STARTS = [
  { x: 9,  y: 9,  color: '#FF0000', name: 'BLINKY' },
  { x: 10, y: 9,  color: '#FFB8FF', name: 'PINKY'  },
  { x: 11, y: 9,  color: '#00FFFF', name: 'INKY'   },
  { x: 10, y: 10, color: '#FFB852', name: 'CLYDE'  },
];

export const FRIGHTENED_DURATION = 7000; // ms
export const GHOST_SPEED = 220;          // ms per move
export const PACMAN_SPEED = 170;         // ms per move

export const INITIAL_PAKU_HIGHSCORES = [
  { name: 'ARM', score: 18200 },
  { name: 'NRT', score: 11400 },
  { name: 'CSS', score: 9800  },
  { name: 'MKO', score: 7200  },
  { name: 'AAA', score: 5600  },
  { name: 'TEO', score: 4100  },
  { name: 'NRT', score: 3200  },
  { name: 'AAA', score: 2700  },
  { name: 'ZZZ', score: 1500  },
  { name: 'PLY', score: 900   },
];
