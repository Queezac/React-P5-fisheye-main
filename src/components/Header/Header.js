import Image from "next/image";
import styles from './Header.module.css';
import Link from "next/link";

export default async function Header({displayText = true}) {
  return (
    <div className={styles.header}>
      <Link href={`/`}>
        <Image 
          src="/assets/logo/logo-fisheye.png"
          alt="Logo FishEye"
          width={400}
          height={300}
          className={styles.image}
        />
      </Link>
      {displayText && <p className={styles.textHeader}>Nos photographes</p>}
    </div>
  );
}
