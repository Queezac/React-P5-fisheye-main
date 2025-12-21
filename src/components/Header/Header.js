import Image from "next/image";
import styles from './Header.module.css';

export default async function Header() {
  return (
    <div className={styles.header}>
        <Image 
            src="/assets/logo/logo-fisheye.png"
            alt="Logo FishEye"
            width={400}
            height={300}
            className={styles.image}
        />
        <p className={styles.textHeader}>Nos photographes</p>
    </div>
  );
}
