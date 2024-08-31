import { useEffect, useState } from "react";
import { TypeLevelDto } from "../../types/Landing.types";
import LandingService from "../../services/Landing.service";
import styles from "./TypeLevelAndLevel.module.css";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../../../routes/routes";

const TypeLevelAndLevel = () => {
  const [typeLevelAndLevel, setTypeLevelAndLevel] = useState<TypeLevelDto[]>(
    []
  );

  const navigate = useNavigate();

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

  const onClickLevel = (id: number) => {
    navigate(`${PublicRoutes.LEVEL}/${id}`);
  };

  return (
    <div className={styles.containertypeLevelCard}>
      <div className={styles.containertypeLevel}>
        <h1 className={styles.mainTitle}>
          Impulsa tu Éxito con Formación de Alta Calidad
        </h1>
        <p className={styles.mainDescription}>
          Cursos diseñados para todas las edades y niveles, impartidos por
          expertos en la enseñanza del inglés
        </p>
      </div>
      {typeLevelAndLevel
        .sort((a, b) => a.order - b.order)
        .map((typeLevel) => (
          <div key={typeLevel.id} className={styles.typeLevelCard}>
            <h2 className={styles.typeLevelTitle}>{typeLevel.title}</h2>
            <p className={styles.typeLevelDescription}>
              {typeLevel.description}
            </p>
            <div className={styles.levelsContainer}>
              {typeLevel.levels
                .sort((a, b) => a.order - b.order)
                .map((level) => (
                  <div key={level.id} className={styles.levelCard}>
                    <div className={styles.containerLevelTitle}>
                      <span className={styles.levelTitle}>{level.title}</span>
                    </div>
                    <div className={styles.contaienerLevelDescription}>
                      <p className={styles.levelDescription}>
                        {level.description}
                      </p>
                    </div>
                    <div className={styles.contaienerButtons}>
                      <button
                        onClick={() => onClickLevel(level.id)}
                        className={styles.button}
                      >
                        Más información
                      </button>
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
