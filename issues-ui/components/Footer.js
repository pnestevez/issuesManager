// Components
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://https://www.mercadolibre.com.ar/" target="_blank" rel="noopener noreferrer">
        Powered by
        {' '}
        <img src="/logo__small.png" alt="Meli Logo" className={styles.logo} />
      </a>
    </footer>
  );
}
