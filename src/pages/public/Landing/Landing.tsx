import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import styles from "./Landing.module.css";
import TypeLevelAndLevel from "./components/TypeLevelAndLevel/TypeLevelAndLevel";
import { TeacherDto } from "./types/Landing.types";
import LandingService from "./services/Landing.service";
import Teacher from "./components/Teacher/Teacher";
import Questions from "../../../components/Questions/Questions";
import imgHeaderTeacher from "../../../assets/img1.svg";
import inHouseImg from "../../../assets/INHOUSE.svg";

const Landing = () => {
  const [teachers, setTeachers] = useState<TeacherDto[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
            Descubre nuevas oportunidades y estudia online
          </h1>
          <p className={styles.landingHeaderInfo_subtitle}>
            Aprender inglés es más que dominar un idioma; es abrir puertas a
            nuevas oportunidades, conexiones y crecimiento personal. Con
            nosotros, superarás tus límites, alcanzarás tus metas y disfrutarás
            cada lección con un enfoque dinámico y motivador. ¡Únete y
            transforma tu futuro!
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
          Nuestros mentores de inglés cuentan con experiencia y excelentes
          técnicas pedagógicas, brindando un aprendizaje efectivo y dinámico que
          facilita la comprensión y el dominio del idioma en diferentes
          contextos
        </p>
        <Teacher teachers={teachers} />
      </div>
      <Questions />
      <footer className={styles.footer}>
        <div className={styles.footerConatainer}>
          <img className={styles.footerImgLogo} src={inHouseImg} alt="" />

          <div className={styles.footerFotterConatainer}>
            <span className={styles.footerFotterConatainer_item}>
              Contáctos
            </span>
            <span className={styles.footerFotterConatainer_item}>
              Términos y Condiciones
            </span>
            <span className={styles.footerFotterConatainer_item}>
              Privacidad
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
