import globe from 'assets/global.png';
import styles from './Header.module.scss';

export default function Header(): JSX.Element {
  return (
    <div className={styles['header-container']}>
      <img src={globe} alt='blue-green-globe' />
      <h1>wunderlist</h1>
      <h3>find and save your new favorite place</h3>
    </div>
  );
}
