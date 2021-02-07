import styles from './RestaurantLoaderBubbles.module.scss';

export default function RestaurantLoaderBubbles() {
  return (
    <div className={styles['restaurant-prof-bubble-loader']}>
      <div className={styles['bubble']} data-testid='loader-bubble'></div>
      <div className={styles['bubble']} data-testid='loader-bubble'></div>
      <div className={styles['bubble']} data-testid='loader-bubble'></div>
    </div>
  );
}
