import Image from "next/image";
import styles from './Header.module.css';
import Link from "next/link";

export default async function Header({ displayText = true }) {
  return (
    <header className={styles.header} role="banner">
      <Link href="/" aria-label="Fisheye Home Page">
        <Image 
          src="/assets/logo/logo-fisheye.png"
          alt="Fisheye Home page"
          width={400}
          height={300}
          className={styles.image}
          priority
        />
      </Link>
      
      {displayText && (
        <h1 className={styles.textHeader}>
          Nos photographes
        </h1>
      )}
    </header>
  );
}