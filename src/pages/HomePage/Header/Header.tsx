import globe from 'assets/global.png';
import styles from 'pages/HomePage/Header/Header.module.scss';

export default function Header() {
  return (
    <div className={styles['header-container']}>
      <img
        className={styles['header-main-logo']}
        src={globe}
        alt='blue-green-globe'
      />
      <h1 className={styles['header-main-title']}>wunderlist</h1>
      <h2 className={styles['header-sub-title']}>
        find and save your new favorite place
      </h2>
    </div>
  );
}
