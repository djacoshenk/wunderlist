import globe from 'assets/global.png';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <img
        className={styles.headerMainLogo}
        src={globe}
        alt='blue-green-globe'
      />
      <h1 className={styles.headerMainTitle}>wunderlist</h1>
      <h3 className={styles.headerSubTitle}>
        find and save your new favorite place
      </h3>
    </div>
  );
}
