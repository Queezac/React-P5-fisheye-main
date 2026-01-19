import { notFound } from "next/navigation";
import Image from "next/image";
import { getPhotographerWithLikes, getAllMediasForPhotographer } from "../../lib/prisma-db.js";
import { Header, ContactForm, Gallery } from "../../../components";
import styles from '../../page.module.css';

export const metadata = {
  title: "Fisheye - Photographes professionnels",
  description: "Découvrez les meilleurs photographes professionnels sur Fisheye.",
};

export default async function PhotographerPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) notFound();

  const [photographer, medias] = await Promise.all([
    getPhotographerWithLikes(Number(id)),
    getAllMediasForPhotographer(Number(id))
  ]);

  if (!photographer) notFound();

  return (
    <div className={styles.container}>
      <Header displayText={false} />

      <main id="main-content">
        <section className={styles.infoContainer}>
          <div className={styles.details} aria-labelledby="photographer-name">
            <h1 id="photographer-name">{photographer.name}</h1>
            <p className={styles.localisation}>{photographer.city}, {photographer.country}</p>
            <p className={styles.tagline}>{photographer.tagline}</p>
          </div>

          <div className={styles.contact}>
            <ContactForm photographerName={photographer.name} />
          </div>

          <div className={styles.portrait}>
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
          </div>
        </section>
        <Gallery medias={medias} photographer={photographer} />
      </main>
    </div>
  );
}