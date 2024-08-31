import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import styles from "./Landing.module.css";
import TypeLevelAndLevel from "./components/TypeLevelAndLevel/TypeLevelAndLevel";
import { TeacherDto } from "./types/Landing.types";
import LandingService from "./services/Landing.service";
import Teacher from "./components/Teacher/Teacher";
import Questions from "../../../components/Questions/Questions";
import AACIInfo from "./components/AACIInfo/AACIInfo";

const Landing = () => {
  const [teachers, setTeachers] = useState<TeacherDto[]>([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const service = LandingService.crud();
      service.setUrl(`/teachers`);
      const result = await service.findAll<TeacherDto[]>();
      setTeachers(result);
    } catch (error) {}
  };

  return (
    <>
      <Header />
      <div className={styles.landingContainer}>
        <TypeLevelAndLevel />
      </div>
      <div className={styles.landingContainerTeachers}>
        <h2 className={styles.teacherTitle}>
          Instructores de Inglés de Clase Mundial
        </h2>
        <p className={styles.teacherDescription}>
          Aprende de profesionales altamente calificados con años de experiencia
          enseñando inglés a estudiantes de todo el mundo. Nuestros instructores
          están comprometidos a llevar tu dominio del idioma al siguiente nivel,
          utilizando métodos probados y personalizados.
        </p>
        <Teacher teachers={teachers} />
      </div>
      <div className={styles.landingContainerAaci}>
        <AACIInfo />
      </div>
      <Questions />
    </>
  );
};

export default Landing;
