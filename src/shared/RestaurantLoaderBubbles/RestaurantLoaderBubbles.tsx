import styles from './RestaurantLoaderBubbles.module.scss';

export default function RestaurantLoaderBubbles() {
  return (
    <div className={styles['restaurant-prof-bubble-loader']}>
      <div className={styles['bubble']}></div>
      <div className={styles['bubble']}></div>
      <div className={styles['bubble']}></div>
    </div>
  );
}
