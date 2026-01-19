import styles from '../../page.module.css';

export default function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p>Chargement du profil du photographe...</p>
    </div>
  );
}