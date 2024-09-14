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
  const [typeLevelSelect, setTypeLevelSelect] = useState<{id: number, typeLevelTitle: string }>({
    id: 0,
    typeLevelTitle: ""
  });
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

  const handleLevelClick = (id: number, levelTitle: string) => {
    const title = `Inglés ${typeLevelSelect.typeLevelTitle} ${levelTitle}`
    navigate(`${PublicRoutes.LEVEL}/${id}/${title}`);
  };

  const renderLevel = (typeLevel: TypeLevelDto) => {
    return (
      typeLevel.id === typeLevelSelect.id && (
        <div key={typeLevel.id} className={styles.typeLevelCard}>
          <div className={styles.levelsContainer}>
            {typeLevel.levels
              .sort((a, b) => a.order - b.order)
              .map((level) => (
                <div
                  onClick={() => handleLevelClick(level.id, level.title)}
                  key={level.id}
                  className={styles.levelCard}
                >
                  <div className={styles.levelCardCont}>
                    <div className={styles.containerLevelTitle}>
                      <span className={styles.levelTitle}>{level.title}</span>
                    </div>
                    <div className={styles.contaienerLevelDescription}>
                      <p className={styles.levelDescription}>
                        {level.description}
                      </p>
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
        <h2 className={styles.mainTitle}>Niveles</h2>
        <p className={styles.mainDescription}>
          Impulsa tu éxito con formación de alta calidad. Cada curso está
          diseñado para facilitar el aprendizaje a todas las edades, con niveles
          adaptados para que todos puedan aprender de manera efectiva
        </p>
      </div>

      <div className={styles.contTypeLevel}>
        {typeLevelAndLevel
          .sort((a, b) => a.order - b.order)
          .map((typeLevel) => (
            <div
              key={typeLevel.id}
              onClick={() => setTypeLevelSelect({id: typeLevel.id, typeLevelTitle: typeLevel.title})}
              className={typeLevelSelect.id == typeLevel.id ? styles.typeLevelSelect : styles.typeLevel}
            >
              <div className={typeLevelSelect.id == typeLevel.id ? styles.typeLevel_InfoSelect : styles.typeLevel_Info}>
                <span className={styles.typeLevel_Title}>
                  {typeLevel.title}
                </span>
              </div>
            </div>
          ))}
      </div>

      {typeLevelSelect.id > 0 &&
        typeLevelAndLevel.map((type) => renderLevel(type))}
    </div>
  );
};

export default TypeLevelAndLevel;
