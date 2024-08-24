import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LevelService from "./service/Level.service";
import { LevelDto } from "./types/Level.types";
import style from "./Level.module.css";
import Plans from "./components/Plans/Plans";
import Header from "../../../components/Header/Header";
import Teacher from "./components/Teacher/Teacher";
import { PublicRoutes } from "../../../routes/routes";

const Level = () => {
  const { idLevel } = useParams<{ idLevel: string }>();
  const [lev, setLev] = useState<LevelDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
      `/${PublicRoutes.PUBLIC}/${PublicRoutes.PRE_REGISTRATION}/level/${idLevel}/${lev?.title}/cohort/${idCohort}`
    );
  };

  return (
    <>
      <Header />
      <div className={style.levelContainer}>
        {lev ? (
          <>
            <div className={style.levelContainerTitle}>
              <h1 className={style.levelTitle}>{lev.title}</h1>
              <p className={style.levelDescription}>{lev.description}</p>
            </div>
            <h2 className={style.cohortsTitle}>Próximas fechas</h2>
            <div className={style.cohortsContainer}>
              {lev.cohorts.map((cohort) => (
                <div key={cohort.id} className={style.cohortCard}>
                  <p className={style.cohortTitle}>
                    <p className={style.cohortTitleCloseIscription}>
                      Cierre de inscripción:{" "}
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
                        Quiero empezar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div className={style.levelContainerPlans}>
          <h2 className={style.ContainerPlansTitle}>
            Educación de calidad al alcance de todos.
          </h2>
          <p className={style.ContainerPlansDescription}>
            Sea cual sea tu situación, en En-Enlgish tienes la oportunidad de
            transformar tu vida en cualquier momento. Elige la opción que mejor
            se ajuste a tus necesidades.
          </p>

          <>
            <Plans idLevel={idLevel ? Number(idLevel) : 0} />
          </>
        </div>

        <div>
          {lev ? (
            <div>
              <h2 className={style.teacherTitle}>DOCENTES</h2>
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
