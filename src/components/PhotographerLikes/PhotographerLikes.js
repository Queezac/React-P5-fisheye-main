"use client";

import { useState } from "react";
import Gallery from "../Gallery/Gallery";
import styles from "./PhotographerLikes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

export default function PhotographerContent({ photographer, medias }) {
  const [totalLikes, setTotalLikes] = useState(photographer.totalLikes);

  const handleTotalLikes = (diff) => {
    setTotalLikes(prev => prev + diff);
  };

  return (
    <>
      <Gallery medias={medias} onLikeChange={handleTotalLikes} />

      <aside className={styles.photographerCardBottom} aria-label="Statistiques et tarif du photographe">
        <div className={styles.likesTotal}>
          <span>{totalLikes}</span>
          <span aria-label="likes total" role="img">
            <FontAwesomeIcon icon={faHeartSolid} style={{ color: "black" }} />
          </span>
        </div>
        <p>{photographer.price}€ / jour</p>
      </aside>
    </>
  );
}