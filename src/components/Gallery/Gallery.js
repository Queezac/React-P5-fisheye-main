"use client";

import { useState } from "react";
import Image from "next/image";
import styles from './Gallery.module.css';

export default function Gallery({ medias }) {
  const [sortType, setSortType] = useState("popularity");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedMedias = [...medias].sort((a, b) => {
    if (sortType === "popularity") return b.likes - a.likes;
    if (sortType === "date") return new Date(b.date) - new Date(a.date);
    if (sortType === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  const imagesOnly = sortedMedias.filter(media => media.image);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + imagesOnly.length) % imagesOnly.length);
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % imagesOnly.length);
  };

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
        {imagesOnly.map((media, index) => (
          <div key={media.id} className={styles.mediaCard} onClick={() => openModal(index)}>
            <Image
              src={`/assets/${media.image}`}
              alt={media.title}
              width={250}
              height={250}
              style={{ objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
            />
            <div className={styles.mediaInfo}>
              <p>{media.title}</p>
              <p>{media.likes} ♥</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={closeModal} type="button">✖</button>

            <button className={styles.prevButton} onClick={prevImage} type="button">◀</button>

            <Image
              src={`/assets/${imagesOnly[currentIndex].image}`}
              alt={imagesOnly[currentIndex].title}
              width={800}
              height={600}
              style={{ objectFit: 'contain', pointerEvents: 'none' }}
            />

            <button className={styles.nextButton} onClick={nextImage} type="button">▶</button>

            <p>{imagesOnly[currentIndex].title}</p>
          </div>
        </div>
      )}

    </div>
  );
}
