import styles from 'shared/RestaurantLoaderBubbles/RestaurantLoaderBubbles.module.scss';

export default function RestaurantLoaderBubbles() {
  return (
    <div
      className={styles['restaurant-prof-bubble-loader']}
      data-testid='loader-bubble-container'
    >
      <div className={styles['bubble']} data-testid='loader-bubble'></div>
      <div className={styles['bubble']} data-testid='loader-bubble'></div>
      <div className={styles['bubble']} data-testid='loader-bubble'></div>
    </div>
  );
}
