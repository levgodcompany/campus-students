import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LevelService from "./service/Level.service";
import { LevelDto } from "./types/Level.types";
import style from "./Level.module.css";
import Header from "../../../components/Header/Header";
import Teacher from "./components/Teacher/Teacher";
import { PublicRoutes } from "../../../routes/routes";
import levelImg from "../../../assets/Level.svg";
import Loading from "../../../components/Loading/Loading";

const Level = () => {
  const { idLevel, title } = useParams<{ idLevel: string; title: string }>();
  const [lev, setLev] = useState<LevelDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLevel();
  }, []);

  const fetchLevel = async () => {
    try {
      if (idLevel) {
        const service = LevelService.crud();
        service.setUrl(`/level/cohorts/`);
        const res = await service.findOne<LevelDto>(Number(idLevel));
        setLev(res);
      }
    } catch (error) {
      console.error("Error fetching level data:", error);
    }
  };

  const handleOnClikRedirect = (idCohort: number) => {
    navigate(
      `/${PublicRoutes.PUBLIC}/${PublicRoutes.PRE_REGISTRATION}/level/${idLevel}/${title}/cohort/${idCohort}`
    );
  };

  return (
    <>
      <Header />
      <div className={style.levelContainer}>
        {lev ? (
          <>
            <div className={style.levelContainerTitle}>
              {/* <img src={levelImg} alt="" /> */}
              <div>
                <h1 className={style.levelTitle}>{title}</h1>
                <p className={style.levelDescription}>{lev.description}</p>
              </div>
            </div>
            <div>
              <h2 className={style.cohortsTitle}>Próximas Fechas</h2>
              <p className={style.cohortsTitleDescript}>
                En nuestro enfoque de enseñanza, trabajamos en grupos reducidos
                para agilizar el aprendizaje y personalizar cada clase según las
                necesidades individuales de los estudiantes, garantizando una
                experiencia educativa más efectiva y adaptada
              </p>
            </div>
            <div className={style.cohortsContainer}>
              {lev.cohorts.map((cohort) => (
                <div key={cohort.id} className={style.cohortCard}>
                  <p className={style.cohortTitle}>
                    <p className={style.cohortTitleCloseIscription}>
                      Inicio de Inscripción:{" "}
                      {new Date(
                        cohort.registrationStartDate
                      ).toLocaleDateString()}
                    </p>
                    <p className={style.cohortTitleCloseIscription}>
                      Cierre de Inscripción:{" "}
                      {new Date(
                        cohort.registrationEndDate
                      ).toLocaleDateString()}
                    </p>
                  </p>
                  <div className={style.dates}>
                    <div className={style.datesDate}>
                      <p className={style.datesDate_title}>Desde el:</p>
                      <p className={style.datesDate_date}>
                        {new Date(cohort.startDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className={style.datesDate}>
                      <p className={style.datesDate_title}>Hasta el:</p>
                      <p className={style.datesDate_date}>
                        {new Date(cohort.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className={style.datesDate}>
                      <button
                        onClick={() => handleOnClikRedirect(cohort.id)}
                        className={style.datesDateButton}
                      >
                        Quiero Iniciar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Loading />
        )}

        <div>
          {lev ? (
            <div>
              <h2 className={style.teacherTitle}>Referentes</h2>
              <p className={style.cohortsTitleDescript}>
                Nuestros mentores de inglés cuentan con experiencia y excelentes
                técnicas pedagógicas, brindando un aprendizaje efectivo y
                dinámico que facilita la comprensión y el dominio del idioma en
                diferentes contextos
              </p>
              <Teacher teachers={lev.teachers} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Level;
