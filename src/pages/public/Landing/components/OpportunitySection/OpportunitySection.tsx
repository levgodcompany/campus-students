import React from 'react';
import styles from './OpportunitySection.module.css';
import img from "../../../../../assets/img1.svg"

const OpportunitySection: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>
          Descubre nuevas <br /> oportunidades y <br /> estudia online
        </h1>
        <p className={styles.description}>
          Aprender inglés es más que dominar un idioma; es abrir puertas a nuevas oportunidades, conexiones y crecimiento personal. Con nosotros, superarás tus límites, alcanzarás tus metas y disfrutarás cada lección con un enfoque dinámico y motivador. ¡Únete y transforma tu futuro!
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img
          src={img} // Cambia el src al archivo de imagen adecuado
          alt="Estudiante"
          className={styles.studentImage}
        />
      </div>
    </section>
  );
};

export default OpportunitySection;
