import { useEffect, useState } from "react";
import UnitiesService from "./services/Unities.service";
import style from "./Unities.module.css";
import { TeacherDto, Unit } from "./types/Unities.types";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../../routes/routes";
import { useDispatch } from "react-redux";
import {
  addPage,
  clearNavigation,
  updatePage,
} from "../../../redux/slices/Navigations.slice";
import Navigation from "../../../components/Navigation/Navigation";
import LevelsService from "../Levels/services/Levels.service";
import { levelDto } from "../types/Levels.types";
import Teacher from "./components/Teacher/Teacher";
import { useAppSelector } from "../../../redux/hooks";
import { axiosError } from "../../../utilities/https.utility";
import imgUnit from "../../../assets/deployment-unit-svgrepo-com.svg"
import HeaderCampus from "../../../components/HeaderCampus/HeaderCampus";

const Unities = () => {
  const [unities, setUnities] = useState<Unit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [levelSelect, setLevelSelect] = useState<levelDto | null>(null);
  const [teachers, setTeachers] = useState<TeacherDto[]>([]);
  const studetState = useAppSelector((state) => state.student);
  const { idLevel, titleLevel } = useParams<{
    idLevel: string;
    titleLevel: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUnities();
    fetchLevel();
    fetchTeachers();
    dispatch(clearNavigation());
    dispatch(
      addPage({
        title: `Nivel: ${levelSelect?.title}`, // Título de la página
        description: "", // Descripción de la página
        url: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}`,
      })
    );
    dispatch(
      addPage({
        title: `Unidades`, // Título de la página
        description: "", // Descripción de la página
        url: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.UNITIES}/${idLevel}`,
      })
    );
  }, [idLevel]);

  useEffect(() => {
    dispatch(clearNavigation());
    dispatch(
      addPage({
        title: `Nivel: ${levelSelect?.title}`, // Título de la página
        description: "", // Descripción de la página
        url: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}`,
      })
    );
    dispatch(
      addPage({
        title: `Unidades`, // Título de la página
        description: "", // Descripción de la página
        url: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.UNITIES}/${idLevel}`,
      })
    );
  }, [levelSelect]);

  const fetchTeachers = async () => {
    try {
      const app = LevelsService.crud();
      app.setUrl(`/teachers/${idLevel}`);
      const res = await app.findAll<TeacherDto[]>();
      setTeachers(res);
    } catch (error) {
      const e = axiosError(error);
      if (e.statusCode == 403) {
        navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`, {
          replace: true,
        });
      }
      setError("No se pudieron cargar las unidades.");
    }
  };

  const fetchUnities = async () => {
    try {
      const app = UnitiesService.crud();
      app.setUrl(`/levels/${idLevel}/student/${studetState?.id}`);
      // app.setUrl(`/level/${idLevel}`);
      const res = await app.findAll();
      setUnities(res);
    } catch (error) {
      const e = axiosError(error);
      if (e.statusCode == 403) {
        navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`, {
          replace: true,
        });
      }
      setError("No se pudieron cargar las unidades.");
    }
  };

  const fetchLevel = async () => {
    try {
      const app = LevelsService.crud();
      // app.setUrl(`/level/${idLevel}`);
      const res = await app.findOne<levelDto, string>(`/${Number(idLevel)}`);
      setLevelSelect(res);
    } catch (error) {
      const e = axiosError(error);
      if (e.statusCode == 403) {
        navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`, {
          replace: true,
        });
      }
      setError("No se pudieron cargar las unidades.");
    }
  };

  const handleCardClick = (unit: Unit) => {
    const url = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.COURSES}/${unit.id}/${unit.title}`;
    dispatch(
      updatePage({
        prevTitle: `Unidades`,
        newTitle: `Unidad: ${unit.title}`,
      })
    );
    dispatch(
      addPage({
        title: `Cursos`,
        description: "",
        url,
      })
    );
    navigate(url, { replace: true });
  };

  return (
    <>
    <HeaderCampus />
    <div className={style.container}>
      <Navigation />
      {error && (
        <MessageError
          title="Error"
          message={error}
          cancel={() => setError(null)}
        />
      )}

      <div className={style.containerTitle}>
        <h1 className={style.title}>{levelSelect?.title}</h1>
        <p className={style.titleDescription}>{levelSelect?.description}</p>
        {/* <div>

        </div> */}
      </div>

      {/* <h1 className={style.title}>Unidades del Nivel "{levelSelect?.title}"</h1> */}

      <div className={style.containerInfo}>
        <div className={style.cardContainer}>
          {unities.length > 0 ? (
            unities
              .sort((a, b) => a.order - b.order)
              .map((unit) => (
                <div
                  onClick={() => handleCardClick(unit)}
                  key={unit.id}
                  className={style.card}
                >
                  <div className={style.cardInternal}>
                    <img src={imgUnit} alt="" />
                    <h2 className={style.cardTitle}>{unit.title}</h2>

                  </div>
                </div>
              ))
          ) : (
            <p>No hay unidades disponibles</p>
          )}
        </div>

        <div className={style.cardContainerTeacher}>
          <Teacher teachers={teachers} />
        </div>
      </div>
    </div>
    </>
  );
};

export default Unities;
