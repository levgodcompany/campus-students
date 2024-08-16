import { useEffect, useState } from "react";
import { TypeLevelDto } from "../../types/Landing.types";
import LandingService from "../../services/Landing.service";
import styles from "./TypeLevelAndLevel.module.css";

const TypeLevelAndLevel = () => {
  const [typeLevelAndLevel, setTypeLevelAndLevel] = useState<TypeLevelDto[]>(
    []
  );

  useEffect(() => {
    fetchTypeLevelAndLevel();
  }, []);

  const fetchTypeLevelAndLevel = async () => {
    try {
      const service = LandingService.crud();
      service.setUrl(`/levels`);
      const result = await service.findAll<TypeLevelDto[]>();
      setTypeLevelAndLevel(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.containertypeLevelCard}>
      <h1 className={styles.mainTitle}>
        Capacitación de Calidad para el Éxito Profesional
      </h1>
      <p className={styles.mainDescription}>
        Nuestros niveles están diseñados para ofrecer una experiencia educativa
        de primera clase, enfocada en proporcionar una formación integral que
        prepara a los estudiantes para alcanzar sus metas profesionales. Con un
        enfoque en la calidad y la excelencia, cada nivel está estructurado para
        asegurar un aprendizaje profundo y significativo, brindando las
        herramientas necesarias para destacar en un entorno competitivo.
      </p>
      {typeLevelAndLevel.map((typeLevel) => (
        <div key={typeLevel.id} className={styles.typeLevelCard}>
          <h2 className={styles.typeLevelTitle}>{typeLevel.title}</h2>
          <p className={styles.typeLevelDescription}>{typeLevel.description}</p>
          <div className={styles.levelsContainer}>
            {typeLevel.levels.sort((a, b)=> a.order - b.order).map((level) => (
              <div key={level.id} className={styles.levelCard}>
                <div className={styles.containerLevelTitle}>
                    <span className={styles.levelTitle}>{level.title}</span>

                </div>
                <div className={styles.contaienerLevelDescription}>
                    <p className={styles.levelDescription}>{level.description}</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TypeLevelAndLevel;
