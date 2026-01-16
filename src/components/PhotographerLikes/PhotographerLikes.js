import styles from "./PhotographerLikes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

export default function PhotographerContent({ price, totalLikes }) {

  return (
    <>
      <aside className={styles.photographerCardBottom} aria-label="Statistiques et tarif du photographe">
        <div className={styles.likesTotal}>
          <span>{totalLikes}</span>
          <span aria-label="likes total" role="img">
            <FontAwesomeIcon icon={faHeartSolid} style={{ color: "black" }} />
          </span>
        </div>
        <p>{price}€ / jour</p>
      </aside>
    </>
  );
}