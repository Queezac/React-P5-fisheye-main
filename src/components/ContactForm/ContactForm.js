"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm({ photographerName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsOpen(false);
  };

  return (
    <>
      <button className={styles.contactForm} onClick={() => setIsOpen(true)}>Contactez-moi</button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>

            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>✖</button>

            <div className={styles.titleContainer}>
              <h2>Contactez-moi</h2>
              <h2>{photographerName}</h2>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <label>Prénom</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                required
              />

              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
              />

              <label>Votre message</label>
              <textarea
                name="message"
                onChange={handleChange}
                required
              />

              <button className={styles.sendButton} type="submit">Envoyer</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
