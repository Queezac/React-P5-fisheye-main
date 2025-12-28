import { getAllPhotographers } from "../../app/lib/prisma-db.js";
import Image from "next/image";
import Link from "next/link";
import styles from './PhotographersList.module.css';

export default async function PhotographersList() {
  const photographers = await getAllPhotographers();

  return (
    <div className={styles.gridContainer}>
      {photographers.map(p => (
        <div key={p.id} className={styles.photographerCard}>
          
          <Link href={`/photographes/${p.id}`}>
            <div className={styles.photoName}>
              <div className={styles.photoWrapper}>
                <Image 
                  src={`/assets/${p.portrait}`} 
                  alt={p.name} 
                  fill
                  className={styles.photo}
                />
              </div>
              <h2 className={styles.name}>{p.name}</h2>
            </div>
          </Link>

          <div className={styles.info}>
            <p className={styles.cityCountry}>{p.city} - {p.country}</p>
            <p className={styles.tagline}>{p.tagline}</p>
            <p className={styles.price}>{p.price}€/jour</p>
          </div>

        </div>
      ))}
    </div>
  );
}
