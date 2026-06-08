import { useState } from 'react';
import Navbar from '../components/Navbar';
import GameMenu from '../components/GameMenu';
import TextrisGame from '../components/TextrisGame';
import styles from '../styles/Home.module.css';
import { INITIAL_HIGHSCORES } from '../utils/constants';

export default function Home() {
  const [screen, setScreen] = useState('menu'); // 'menu' | 'textris'
  const [highscores, setHighscores] = useState(INITIAL_HIGHSCORES);

  const handleStartGame = () => {
    setScreen('textris');
  };

  const handleBack = () => {
    setScreen('menu');
  };

  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        {screen === 'menu' && (
          <GameMenu onStartGame={handleStartGame} highscores={highscores} />
        )}
        {screen === 'textris' && (
          <TextrisGame onBack={handleBack} />
        )}
      </main>
    </div>
  );
}
