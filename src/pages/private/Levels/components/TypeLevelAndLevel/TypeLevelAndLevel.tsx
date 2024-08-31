import { useEffect, useState } from "react";
import styles from "./TypeLevelAndLevel.module.css";
import { TypeLevelDto } from "../../../../public/Landing/types/Landing.types";
import LandingService from "../../../../public/Landing/services/Landing.service";
import { levelDto } from "../../types/Levels.types";
import { axiosError } from "../../../../../utilities/https.utility";
import { PublicRoutes } from "../../../../../routes/routes";
import { useNavigate } from "react-router-dom";

interface TypeLevelAndLevelProps {
  select: (level: levelDto) => void;
}
const TypeLevelAndLevel: React.FC<TypeLevelAndLevelProps> = ({ select }) => {
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
      const e = axiosError(error);
      if (e.statusCode == 403) {
        navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`, {
          replace: true,
        });
      }
    }
  };

  const onClickLevel = (level: levelDto) => {
    select(level);
  };

  return (
    <div className={styles.containertypeLevelCard}>
      {typeLevelAndLevel
        .sort((a, b) => a.order - b.order)
        .map((typeLevel) => (
          <div key={typeLevel.id} className={styles.typeLevelCard}>
            <div className={styles.infoTypeLevel}>
              <h2 className={styles.typeLevelTitle}>{typeLevel.title}</h2>
              <p className={styles.typeLevelDescription}>
                {typeLevel.description}
              </p>
            </div>
            <div className={styles.levelsContainer}>
              {typeLevel.levels
                .sort((a, b) => a.order - b.order)
                .map((level) => (
                  <div
                    onClick={() => onClickLevel(level)}
                    key={level.id}
                    className={styles.levelCard}
                  >
                    <div className={styles.containerLevelTitle}>
                      <span className={styles.levelTitle}>{level.title}</span>
                    </div>
                    <div className={styles.contaienerLevelDescription}>
                      <p className={styles.levelDescription}>
                        {level.description}
                      </p>
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
