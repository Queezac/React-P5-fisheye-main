import { notFound } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { getPhotographerWithLikes, getAllMediasForPhotographer } from "../../lib/prisma-db.js";
import { Gallery, Header, ContactForm } from "../../../components";
import styles from '../../page.module.css';

export const metadata = {
  title: "Fisheye - Photographes professionnels",
  description: "Découvrez les meilleurs photographes professionnels sur Fisheye.",
};

export default async function PhotographerPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) notFound();

  const photographer = await getPhotographerWithLikes(Number(id));
  if (!photographer) notFound();

  const medias = await getAllMediasForPhotographer(Number(id));

  return (
    <div className={styles.container}>
      <Header displayText={false} />

      <main id="main-content">
        <div className={styles.infoContainer}>
          <section className={styles.details} aria-labelledby="photographer-name">
            <h1 id="photographer-name">{photographer.name}</h1>
            <p className={styles.localisation}>{photographer.city}, {photographer.country}</p>
            <p className={styles.tagline}>{photographer.tagline}</p>
          </section>

          <section className={styles.contact}>
            <ContactForm photographerName={photographer.name} />
          </section>

          <section className={styles.portrait}>
            <div className={styles.photoWrapper}>
              <Image
                src={`/assets/${photographer.portrait}`}
                alt={photographer.name}
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width: 768px) 150px, 200px"
              />
            </div>
          </section>
        </div>

        <Gallery medias={medias} />
      </main>

      <aside className={styles.photographerCardBottom} aria-label="Statistiques et tarif du photographe">
        <div className={styles.likesTotal}>
          <span>{photographer.totalLikes}</span>
          <span aria-label="likes total" role="img">
            <FontAwesomeIcon 
              icon={faHeartSolid} 
              style={{ color: "black" }} 
            />
          </span>
        </div>
        <p>{photographer.price}€ / jour</p>
      </aside>
    </div>
  );
}