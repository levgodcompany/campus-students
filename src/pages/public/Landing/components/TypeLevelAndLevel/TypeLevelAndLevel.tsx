import { useEffect, useState } from "react";
import { TypeLevelDto } from "../../types/Landing.types";
import LandingService from "../../services/Landing.service";
import styles from "./TypeLevelAndLevel.module.css";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../../../routes/routes";

const TypeLevelAndLevel = () => {
  const [typeLevelAndLevel, setTypeLevelAndLevel] = useState<TypeLevelDto[]>([]);
  const [typeLevelSelect, setTypeLevelSelect] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchTypeLevelAndLevel();
  }, []);

  const handleLevelClick = (id: number) => {
    navigate(`${PublicRoutes.LEVEL}/${id}`);
  };

  const renderLevel = (typeLevel: TypeLevelDto) => {
    return (
      typeLevel.id === typeLevelSelect && (
        <div key={typeLevel.id} className={styles.typeLevelCard}>
          <div className={styles.levelsContainer}>
              {typeLevel.levels
                .sort((a, b) => a.order - b.order)
                .map((level) => (
                  <div onClick={()=> handleLevelClick(level.id)} key={level.id} className={styles.levelCard}>
                    <div className={styles.levelCardCont}>
                      <div className={styles.containerLevelTitle}>
                        <span className={styles.levelTitle}>{level.title}</span>
                      </div>
                      <div className={styles.contaienerLevelDescription}>
                        <p className={styles.levelDescription}>{level.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )
    );
  };

  return (
    <div className={styles.containertypeLevelCard}>
      <div className={styles.containertypeLevel}>
        <h2 className={styles.mainTitle}>
          Impulsa tu Éxito con Formación de Alta Calidad
        </h2>
        <p className={styles.mainDescription}>
          Cursos diseñados para todas las edades y niveles, impartidos por
          expertos en la enseñanza del inglés
        </p>
      </div>
      <div>
        <h3 className={styles.tipeLevesTitle}>Niveles</h3>
      </div>

      <div className={styles.contTypeLevel}>
        {typeLevelAndLevel
          .sort((a, b) => a.order - b.order)
          .map((typeLevel) => (
            <div
              key={typeLevel.id}
              onClick={() => setTypeLevelSelect(typeLevel.id)}
              className={styles.typeLevel}
            >
              <div className={styles.typeLevel_Info}>
                <span className={styles.typeLevel_Title}>
                  {typeLevel.title}
                </span>
              </div>
            </div>
          ))}
      </div>

      {typeLevelSelect > 0 &&
        typeLevelAndLevel.map((type) => renderLevel(type))}
    </div>
  );
};

export default TypeLevelAndLevel;
