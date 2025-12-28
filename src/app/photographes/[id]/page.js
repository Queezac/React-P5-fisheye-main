import { notFound } from "next/navigation";
import Image from "next/image";
import { getPhotographerWithLikes, getAllMediasForPhotographer } from "../../lib/prisma-db.js";
import {Gallery, Header, ContactForm} from "../../../components";
import styles from '../../page.module.css';

export default async function PhotographerPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) notFound();

  const photographer = await getPhotographerWithLikes(Number(id));
  if (!photographer) notFound();

  const medias = await getAllMediasForPhotographer(Number(id));

  return (
    <div className={styles.container}>
      <Header displayText={false}/>

      <div className={styles.infoContainer}>
        <section className={styles.details}>
          <h1>{photographer.name}</h1>
          <p className={styles.localisation}>{photographer.city}, {photographer.country}</p>
          <p>{photographer.tagline}</p>
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
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </section>
      </div>

      <Gallery medias={medias} />

      <div className={styles.photographerCardBottom}>
        <p>{photographer.totalLikes} ♥</p>
        <p>{photographer.price}€ / jour</p>
      </div>
    </div>
  );
}
