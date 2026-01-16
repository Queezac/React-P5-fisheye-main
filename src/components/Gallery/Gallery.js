"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useHotkeys } from "react-hotkeys-hook";
import PhotographerLikes from "../PhotographerLikes/PhotographerLikes.js";

export default function Gallery({ medias, photographer }) {

  const [galleryMedias, setGalleryMedias] = useState(medias);
  const [sortType, setSortType] = useState("popularity");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [totalLikes, setTotalLikes] = useState(photographer.totalLikes);

  const handleLike = (e, mediaId) => {
    e.stopPropagation();
    
    const targetMedia = galleryMedias.find(m => m.id === mediaId);
    if (!targetMedia) return;

    const isLiked = !targetMedia.isLiked;
    const diff = isLiked ? 1 : -1;

    setTotalLikes(prev => prev + diff);

    setGalleryMedias(prevMedias =>
      prevMedias.map(media => {
        if (media.id === mediaId) {
          return {
            ...media,
            likes: isLiked ? media.likes + 1 : media.likes - 1,
            isLiked: isLiked
          };
        }
        return media;
      })
    );
  };

  const sortedMedias = [...galleryMedias].sort((a, b) => {
    if (sortType === "popularity") return b.likes - a.likes;
    if (sortType === "date") return new Date(b.date) - new Date(a.date);
    if (sortType === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  const getSortLabel = () => {
    if (sortType === 'popularity') return 'Popularité';
    if (sortType === 'date') return 'Date';
    if (sortType === 'title') return 'Titre';
  };

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
  
  
  useHotkeys('arrowright', () => nextMedia(), {
    enabled: isModalOpen,
  });

  useHotkeys('arrowleft', () => prevMedia(), {
    enabled: isModalOpen,
  });

  useHotkeys('escape', () => closeModal(), {
    enabled: isModalOpen,
  });


  return (
    <section className={styles.container} aria-label="Galerie de médias">
      <nav className={styles.sortWrapper} aria-label="Options de tri">
        <label className={styles.sortLabel}>Trier par</label>
        
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
        
      </nav>
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
              <h2 className={styles.mediaTitle}>{media.title}</h2>
              <div className={styles.likesContainer}>
                <span className={styles.likesCount}>{media.likes}</span>
                <button className={styles.likeButton} onClick={(e) => handleLike(e, media.id)} aria-label="Aimer cette photo">
                  <FontAwesomeIcon 
                    icon={media.isLiked ? faHeartSolid : faHeartRegular} 
                    style={{ color: "#901c1c" }} 
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && currentMedia && (
        <div 
          className={styles.modalOverlay} 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Vue agrandie du média"
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            
            <div className={styles.contentScaler}>
              <div className={styles.sideColumn}>
                <button 
                  className={styles.navButton} 
                  onClick={prevMedia}
                  aria-label="Image précédente"
                >
                  ❮
                </button>
              </div>

              <div className={styles.mediaWrapper}>
                {currentMedia.image ? (
                  <Image
                    src={`/assets/${currentMedia.image}`}
                    alt={currentMedia.title}
                    width={1000}
                    height={900}
                    className={styles.modalImg}
                    priority
                  />
                ) : (
                  <video controls autoPlay className={styles.modalImg} aria-label={currentMedia.title}>
                    <source src={`/assets/${currentMedia.video}`} type="video/mp4" />
                  </video>
                )}
                <p className={styles.modalTitle} aria-hidden="false">{currentMedia.title}</p>
              </div>

              <div className={styles.sideColumn}>
                <button 
                  className={styles.closeButton} 
                  onClick={closeModal}
                  aria-label="Fermer la fenêtre"
                >
                  ✖
                </button>
                <button 
                  className={styles.navButton} 
                  onClick={nextMedia}
                  aria-label="Image suivante"
                >
                  ❯
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <PhotographerLikes price={photographer.price} totalLikes={totalLikes} />

    </section>
  );
}