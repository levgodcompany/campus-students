import { useParams } from "react-router-dom";
import ClassOnliveService from "./services/ClassOnlive.service";
import { useEffect, useState } from "react";
import { ClassOnLiveDto } from "./types/ClassOnlive";
import styles from "./ClassOnlive.module.css"; // Importamos los estilos
import HeaderCampus from "../../../components/HeaderCampus/HeaderCampus";
import Navigation from "../../../components/Navigation/Navigation";
import ClassSelect from "./components/ClassSelect/ClassSelect";

const ClassOnlive = () => {
  const [classOnlives, setClassOnlives] = useState<ClassOnLiveDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectClass, setSelectClass] = useState<ClassOnLiveDto | null>(null);

  const { idCohort } = useParams<{ idCohort: string }>();

  useEffect(() => {
    fetchClass();
  }, []);

  const fetchClass = async () => {
    try {
      const result = await ClassOnliveService.findClassOnLive(Number(idCohort));
      setClassOnlives(result);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching classes");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading classes...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const close = () => {
    setSelectClass(null);
  };

  return (
    <>
      <HeaderCampus />
      <div className={styles.containerNav}>
        <Navigation />
      </div>

      <>
        {selectClass ? (
          <div className={styles.containerClassSelect}>
            <ClassSelect close={close} classS={selectClass} />
          </div>
        ) : (
          <div className={styles.container}>
          <h1 className={styles.title}>Clases Grabadas</h1>
          <p className={styles.titleDescription}>
            En esta sección vas a poder ver las grabaciones de las clases.
          </p>
          <div className={styles.classList}>
            {classOnlives.map((classOnlive, i) => (
              <div
                key={classOnlive.id}
                onClick={() => setSelectClass(classOnlive)}
                className={styles.classCard}
              >
                <span className={styles.classTitle}>{ classOnlive.title || `Clase ${i + 1}`}</span>
              </div>
            ))}
          </div>
        </div>
  
        )}
      </>
    </>
  );
};

export default ClassOnlive;
