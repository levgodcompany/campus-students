import { useEffect, useState } from "react";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import style from "./Levels.module.css";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../routes/routes";
import Navigation from "../../../components/Navigation/Navigation";
import { useDispatch } from "react-redux";
import {
  addPage,
  clearNavigation,
  updatePage,
} from "../../../redux/slices/Navigations.slice";
import HeaderCampus from "../../../components/HeaderCampus/HeaderCampus";
import Level from "./components/Level/Level";
// import Header from "../../../components/Header/Header";

const Levels = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearNavigation());
    dispatch(
      addPage({
        title: `Niveles`, // Título de la página
        description: "", // Descripción de la página
        url: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}`,
      })
    );
  }, []);

  const handleCardClick = (
    levelTitle: string,
    idLevel: number,
    idCohort: number,
    cohortTitle: string | null
  ) => {
    const url = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.UNITIES}/${idLevel}/${idCohort}`;
    dispatch(
      updatePage({
        prevTitle: `Niveles`,
        newTitle: `Nivel: ${levelTitle}${cohortTitle != null ? `:${cohortTitle}` : ''}`,
      })
    );
    dispatch(
      addPage({
        title: `Unidades`, // Título de la página
        description: "", // Descripción de la página
        url,
      })
    );
    navigate(url, { replace: true });
  };

  return (
    <>
      <HeaderCampus />
      <div className={style.container}>
        <div className={style.container_nav}>
          <Navigation />
        </div>

        {/* <h1 className={style.title}>Niveles</h1> */}

        {error && (
          <MessageError
            title="Error"
            message={error}
            cancel={() => setError(null)}
          />
        )}

        <div className={style.cardContainer}>
          {/* <TypeLevelAndLevel select={handleCardClick} /> */}
          <Level select={handleCardClick} />
        </div>
      </div>
    </>
  );
};

export default Levels;
