import { useEffect, useState } from "react";
import { levelDto } from "./types/Levels.types";
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
import TypeLevelAndLevel from "./components/TypeLevelAndLevel/TypeLevelAndLevel";
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

  const handleCardClick = (level: levelDto) => {
    const url = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.UNITIES}/${level.id}/${level.title}`;
    dispatch(
      updatePage({
        prevTitle: `Niveles`,
        newTitle: `Nivel: ${level.title}`,
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
    <div className={style.container}>
      {/* <Header /> */}
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
        <TypeLevelAndLevel select={handleCardClick} />
      </div>
    </div>
  );
};

export default Levels;
