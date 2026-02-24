import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>🧙‍♂️</div>
      <h1 className={styles.title}>Fridge Wizard</h1>
      <p className={styles.tagline}>Turn your chaos into dinner</p>
    </header>
  );
}
