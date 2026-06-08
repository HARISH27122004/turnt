import { useState } from 'react';
import Navbar from '../components/Navbar';
import GameMenu from '../components/GameMenu';
import TextrisGame from '../components/TextrisGame';
import SnakeGame from '../components/SnakeGame';
import PakuGame from '../components/PakuGame';
import styles from '../styles/Home.module.css';
import { INITIAL_HIGHSCORES } from '../utils/constants';

export default function Home() {
  const [screen, setScreen] = useState('menu');
  const [highscores] = useState(INITIAL_HIGHSCORES);

  const handleStartGame = (game) => {
    if (game === 'TEXTRIS') setScreen('textris');
    else if (game === 'SNEKST') setScreen('snekst');
    else if (game === 'PAKKU') setScreen('pakku');
  };

  const handleBack = () => setScreen('menu');

  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        {screen === 'menu' && (
          <GameMenu onStartGame={handleStartGame} highscores={highscores} />
        )}
        {screen === 'textris' && <TextrisGame onBack={handleBack} />}
        {screen === 'snekst' && <SnakeGame onBack={handleBack} />}
        {screen === 'pakku' && <PakuGame onBack={handleBack} />}
      </main>
    </div>
  );
}
