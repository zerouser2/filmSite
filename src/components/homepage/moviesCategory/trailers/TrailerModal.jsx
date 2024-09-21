import React from 'react';
import styles from './trailermodal.module.scss'; // создадим стили позже

const TrailerModal = ({ trailerKey, onClose }) => {
  if (!trailerKey) return null; // Если нет трейлера, не показываем модальное окно

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <iframe
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
