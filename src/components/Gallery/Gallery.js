"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";

export default function Gallery({ medias }) {
  const [sortType, setSortType] = useState("popularity");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [isOpen, setIsOpen] = useState(false);

  const sortedMedias = [...medias].sort((a, b) => {
    if (sortType === "popularity") return b.likes - a.likes;
    if (sortType === "date") return new Date(b.date) - new Date(a.date);
    if (sortType === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const prevMedia = () => {
    setCurrentIndex((currentIndex - 1 + sortedMedias.length) % sortedMedias.length);
  };

  const nextMedia = () => {
    setCurrentIndex((currentIndex + 1) % sortedMedias.length);
  };

  const currentMedia = sortedMedias[currentIndex];

  const getSortLabel = () => {
    if (sortType === 'popularity') return 'Popularité';
    if (sortType === 'date') return 'Date';
    if (sortType === 'title') return 'Titre';
  };

  return (
    <div className={styles.container}>
      <div className={styles.sortWrapper}>
        <span className={styles.sortLabel}>Trier par</span>
        
        <div className={styles.customSelect}>
          <button className={styles.selectTrigger} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
            {getSortLabel()}
            <span className={`${styles.arrow} ${isOpen ? styles.up : styles.down}`}></span>
          </button>

          {isOpen && (
            <div className={styles.selectMenu}>
              {[
                { id: 'popularity', label: 'Popularité' },
                { id: 'date', label: 'Date' },
                { id: 'title', label: 'Titre' }
              ]
              .filter(option => option.id !== sortType)
              .map(option => (
                <div 
                  key={option.id}
                  className={styles.selectOption} 
                  onClick={() => { setSortType(option.id); setIsOpen(false); }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.gallery}>
        {sortedMedias.map((media, index) => (
          <div
            key={media.id}
            className={styles.mediaCard}
            onClick={() => openModal(index)}
          >
            {media.image && (
              <Image
                src={`/assets/${media.image}`}
                alt={media.title}
                width={250}
                height={250}
                className={styles.media}
              />
            )}

            {media.video && (
              <video width={250} height={250} className={styles.media} muted>
                <source src={`/assets/${media.video}`} type="video/mp4" />
              </video>
            )}

            <div className={styles.mediaInfo}>
              <p>{media.title}</p>
              <p className={styles.likes}>{media.likes} ♥</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && currentMedia && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            
            <div className={styles.contentScaler}>
              <div className={styles.sideColumn}>
                <button className={styles.navButton} onClick={prevMedia}>❮</button>
              </div>

              <div className={styles.mediaWrapper}>
                {currentMedia.image ? (
                  <Image
                    src={`/assets/${currentMedia.image}`}
                    alt={currentMedia.title}
                    width={1000}
                    height={900}
                    className={styles.modalImg}
                  />
                ) : (
                  <video controls autoPlay className={styles.modalImg}>
                    <source src={`/assets/${currentMedia.video}`} type="video/mp4" />
                  </video>
                )}
                <p className={styles.modalTitle}>{currentMedia.title}</p>
              </div>

              <div className={styles.sideColumn}>
                <button className={styles.closeButton} onClick={closeModal}>✖</button>
                <button className={styles.navButton} onClick={nextMedia}>❯</button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}