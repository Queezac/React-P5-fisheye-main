'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Oups ! Une erreur est survenue.</h2>
      <p>Impossible de charger les données du photographe.</p>
    </div>
  );
}