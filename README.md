# TEXTRIS — Next.js ASCII Tetris Game

A pixel-perfect clone of the AINO Textris game, built with Next.js and CSS Modules.

## File Structure

```
textris/
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── GameMenu.jsx        # Main menu with game select, highscores, grand champions
│   ├── TextrisGame.jsx     # Full game screen (layout orchestrator)
│   ├── GameBoard.jsx       # ASCII tetris board renderer
│   ├── GameStats.jsx       # Score / Level / Lines / Time panel
│   ├── NextPiece.jsx       # Next piece preview
│   ├── ScoresSidebar.jsx   # Left sidebar with highscores + controls
│   └── MobileControls.jsx  # Touch buttons (shown only on mobile)
│
├── hooks/
│   └── useTextris.js       # All game state & logic (gravity, collisions, scoring)
│
├── utils/
│   ├── constants.js        # Tetrominoes, speeds, initial scores
│   └── gameLogic.js        # Board helpers (rotate, place, clear, ghost)
│
├── styles/
│   ├── globals.css         # CSS variables, resets
│   ├── Home.module.css
│   ├── Navbar.module.css
│   ├── GameMenu.module.css
│   ├── TextrisGame.module.css
│   ├── GameBoard.module.css
│   ├── GameStats.module.css
│   ├── NextPiece.module.css
│   ├── ScoresSidebar.module.css
│   └── MobileControls.module.css
│
├── pages/
│   ├── _app.jsx
│   └── index.jsx
│
├── package.json
└── next.config.js
```

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Controls

| Key | Action |
|-----|--------|
| ← → | Move left/right |
| ↑ | Rotate |
| ↓ | Soft drop |
| Space | Hard drop |
| P | Pause |
| Esc | Back to menu |

On mobile, tap the on-screen buttons.

## Features

- ASCII dot-grid board matching the original aesthetic
- Ghost piece indicator
- 10 tetromino shapes (O, I, T, S, Z, J, L, Y, R, A)
- Level progression with increasing speed
- Score, level, lines, timer
- High score sidebar
- Pause / resume
- Fully responsive: desktop, tablet, mobile
