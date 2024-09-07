import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import styles from "./Landing.module.css";
import TypeLevelAndLevel from "./components/TypeLevelAndLevel/TypeLevelAndLevel";
import { TeacherDto } from "./types/Landing.types";
import LandingService from "./services/Landing.service";
import Teacher from "./components/Teacher/Teacher";
import Questions from "../../../components/Questions/Questions";
import AACIInfo from "./components/AACIInfo/AACIInfo";
import imgHeaderTeacher from "../../../assets/img1.svg";

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
      <div className={styles.landingHeader}>
        <div className={styles.landingHeaderInfo}>
          <h1 className={styles.landingHeaderInfo_title}>
            Transforma tu futuro, estudia online con nosotros
          </h1>
          <p className={styles.landingHeaderInfo_subtitle}>
            Un espacio para aprender, crecer y alcanzar tus metas desde
            cualquier lugar
          </p>
        </div>
        <div className={styles.landingHeaderInfoContainerImg}>
          <img
            className={styles.landingHeaderInfo_img}
            src={imgHeaderTeacher}
            alt=""
          />
        </div>
      </div>
      <div className={styles.landingContainer}>
        <TypeLevelAndLevel />
      </div>
      <div className={styles.landingContainerTeachers}>
        <h2 className={styles.teacherTitle}>Referentes</h2>
        <p className={styles.teacherDescription}>
          Aprende con instructores altamente capacitados y con amplia
          experiencia en la enseñanza del inglés a estudiantes de diversas
          culturas. Nuestros profesores están dedicados a ayudarte a alcanzar un
          dominio avanzado del idioma, utilizando métodos efectivos y adaptados
          a tus necesidades
        </p>
        <Teacher teachers={teachers} />
      </div>
      {/* <div className={styles.landingContainerAaci}>
        <AACIInfo />
      </div> */}
      <Questions />
    </>
  );
};

export default Landing;
