"use client";

import { useState } from "react";
import Image from "next/image";
import styles from './Gallery.module.css';

export default function Gallery({ medias }) {
  const [sortType, setSortType] = useState("popularity");

  const sortedMedias = [...medias].sort((a, b) => {
    if (sortType === "popularity") return b.likes - a.likes;
    if (sortType === "date") return new Date(b.date) - new Date(a.date);
    if (sortType === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div>
      <div className={styles.sortContainer}>
        <label>Trier par :</label>
        <select value={sortType} onChange={e => setSortType(e.target.value)}>
          <option value="popularity">Popularité</option>
          <option value="date">Date</option>
          <option value="title">Titre</option>
        </select>
      </div>

      <div className={styles.gallery}>
        {sortedMedias.map(media => (
          <div key={media.id} className={styles.mediaCard}>
            {media.image && (
              <Image
                src={`/assets/${media.image}`}
                alt={media.title}
                width={250}
                height={250}
                style={{ objectFit: 'cover', borderRadius: '5px' }}
              />
            )}
            {media.video && (
              <video width={250} height={250} controls>
                <source src={`/assets/${media.video}`} type="video/mp4" />
              </video>
            )}
            <div className={styles.mediaInfo}>
              <p>{media.title}</p>
              <p>{media.likes} ♥</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
