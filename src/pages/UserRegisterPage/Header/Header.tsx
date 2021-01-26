import { Link } from 'react-router-dom';

import globe from 'assets/global.png';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles['header-container']}>
      <Link to='/' className={styles['header-link']}>
        <img
          className={styles['header-logo']}
          src={globe}
          alt='blue-green-globe'
        />
      </Link>
    </div>
  );
}
