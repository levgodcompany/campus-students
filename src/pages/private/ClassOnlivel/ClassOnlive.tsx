import { useParams } from "react-router-dom";
import ClassOnliveService from "./services/ClassOnlive.service";
import { useEffect, useState } from "react";
import { ClassOnLiveDto } from "./types/ClassOnlive";
import styles from "./ClassOnlive.module.css"; // Importamos los estilos
import HeaderCampus from "../../../components/HeaderCampus/HeaderCampus";
import Navigation from "../../../components/Navigation/Navigation";

const ClassOnlive = () => {
  const [classOnlives, setClassOnlives] = useState<ClassOnLiveDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
      <HeaderCampus />
      <div className={styles.container}>
        <Navigation />
        <h1 className={styles.title}>Live Classes</h1>
        <div className={styles.classList}>
          {classOnlives.map((classOnlive) => (
            <div key={classOnlive.id} className={styles.classCard}>
              <h2 className={styles.classTitle}>
                {classOnlive.title || "No Title"}
              </h2>
              <p className={styles.classDescription}>
                {classOnlive.description || "No Description"}
              </p>
              <a
                href={classOnlive.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.classLink}
              >
                Watch Class
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClassOnlive;
