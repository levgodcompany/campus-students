import React from "react";
import styles from "./AACIInfo.module.css";

const AACIInfo: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sobre la certificación <span className={styles.aaciSpan}>AACI</span></h1>
        <p className={styles.description}>
          La <strong>certificación de la AACI</strong> es un reconocimiento de
          alta importancia en el ámbito de las inversiones y el capital de
          riesgo en Argentina. Esta certificación valida la calidad, integridad
          y profesionalismo de las empresas y profesionales en el sector.
        </p>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2 className={styles.subtitle}>¿Qué es la AACI?</h2>
          <p className={styles.text}>
            La <strong>AACI</strong> es una asociación líder en Argentina que
            agrupa a los principales actores del mercado de capitales y las
            inversiones. Su misión es promover las mejores prácticas, asegurar
            la transparencia y fomentar el desarrollo del ecosistema de
            inversiones en el país.
          </p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.subtitle}>
            ¿Por qué es importante la certificación de la AACI?
          </h2>
          <ul className={styles.list}>
            <li>
              <strong>Reconocimiento de Calidad:</strong> La certificación
              garantiza que una empresa o profesional cumple con los más altos
              estándares de calidad y ética.
            </li>
            <li>
              <strong>Confianza y Credibilidad:</strong> Refuerza la confianza
              de clientes y socios, demostrando un compromiso con la excelencia.
            </li>
            <li>
              <strong>Cumplimiento Normativo:</strong> Asegura el seguimiento de
              normativas y regulaciones vigentes, protegiendo a los inversores.
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h2 className={styles.subtitle}>Proceso de Certificación</h2>
          <p className={styles.text}>
            El proceso de certificación incluye una evaluación exhaustiva de
            prácticas y procedimientos, revisión de documentación, entrevistas y
            verificación de prácticas de inversión y gestión.
          </p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.subtitle}>Beneficios de la Certificación</h2>
          <ul className={styles.list}>
            <li>
              <strong>Acceso a Oportunidades de Negocio:</strong> Accede a una
              red exclusiva de inversores y oportunidades.
            </li>
            <li>
              <strong>Mejora Continua:</strong> Impulsa la mejora continua en
              prácticas empresariales y profesionales.
            </li>
            <li>
              <strong>Visibilidad y Prestigio:</strong> Eleva el perfil en el
              mercado, destacándote entre competidores.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AACIInfo;
