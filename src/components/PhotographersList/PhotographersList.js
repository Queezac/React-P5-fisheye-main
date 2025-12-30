import { getAllPhotographers } from "../../app/lib/prisma-db.js";
import Image from "next/image";
import Link from "next/link";
import styles from './PhotographersList.module.css';

export const metadata = {
  title: "Fisheye - Accueil",
  description: "Plateforme de photographes professionnels pour vos événements et projets.",
};

export default async function PhotographersList() {
  const photographers = await getAllPhotographers();

  return (
    <main className={styles.gridContainer} id="main-content">
      {photographers.map(p => (
        <article key={p.id} className={styles.photographerCard}>
          
          <Link href={`/photographes/${p.id}`} aria-label={`Voir le profil de ${p.name}`}>
            <div className={styles.photoName}>
              <div className={styles.photoWrapper}>
                <Image 
                  src={`/assets/${p.portrait}`} 
                  alt={p.name}
                  fill
                  className={styles.photo}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h2 className={styles.name}>{p.name}</h2>
            </div>
          </Link>

          <section className={styles.info}>
            <p className={styles.cityCountry} aria-label="Localisation">
              {p.city}, {p.country}
            </p>
            <p className={styles.tagline}>{p.tagline}</p>
            <p className={styles.price} aria-label="Tarif journalier">
              {p.price}€/jour
            </p>
          </section>

        </article>
      ))}
    </main>
  );
}