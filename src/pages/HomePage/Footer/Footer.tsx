import styles from 'pages/HomePage/Footer/Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles['footer-container']}>
      <p>
        Please read docs on usage{' '}
        <a href='https://github.com/djacoshenk/wunderlist#readme'>HERE</a>
      </p>
      <p>
        Request for temporary access to the CORS demo server{' '}
        <a href='http://cors-anywhere.herokuapp.com/corsdemo'>HERE</a>
      </p>
    </div>
  );
}
