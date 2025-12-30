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
              <label htmlFor="firstName">Prénom</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                onChange={handleChange}
                required
                aria-required="true"
              />

              <label htmlFor="lastName">Nom</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                onChange={handleChange}
                required
                aria-required="true"
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                required
                aria-required="true"
              />

              <label htmlFor="message">Votre message</label>
              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                required
                aria-required="true"
              />

              <button className={styles.sendButton} type="submit" aria-label="Envoyer le message">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
