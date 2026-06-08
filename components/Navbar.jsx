import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>AINO</div>
      <div className={styles.navLinks}>
        <span className={styles.navItem}>WORK</span>
        <span className={styles.navItem}>SERVICES</span>
      </div>
      <div className={styles.navCenter}>
        <span className={styles.navItem}>ABOUT</span>
        <span className={styles.navItem}>PLAY</span>
      </div>
      <div className={styles.navRight}>
        <span className={styles.navItem}>SETTINGS</span>
      </div>
      <div className={styles.navContact}>
        <span className={styles.navItem}>CONTACT</span>
      </div>
    </nav>
  );
}
