import { useEffect, useState } from "react";
import { levelDto } from "./types/Levels.types";
import LevelsService from "./services/Levels.service";
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
import Exam from "./components/Exam/Exam";
import Header from "../../../components/Header/Header";

const Levels = () => {
  const [levels, setLevels] = useState<levelDto[]>([]);
  const [levelSelect, _setLevelSelect] = useState<levelDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchLevels();
    dispatch(clearNavigation());
    dispatch(
      addPage({
        title: `Niveles`, // Título de la página
        description: "", // Descripción de la página
        url: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}`,
      })
    );
  }, []);

  const fetchLevels = async () => {
    try {
      const result = await LevelsService.crud().findAll();
      setLevels(result);
    } catch (error) {
      setError(`${error}`);
    }
  };

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
      <Header />
      <div className={style.container_nav}>
        <Navigation />
      </div>

      <h1 className={style.title}>Niveles</h1>

      {error && (
        <MessageError
          title="Error"
          message={error}
          cancel={() => setError(null)}
        />
      )}

      <div className={style.cardContainer}>
        {levels.length > 0 ? (
          levels
            .sort((a, b) => a.order - b.order)
            .map((level) => (
              <div onClick={() => handleCardClick(level)} key={level.id} className={style.card}>
                <h2 className={style.cardTitle}>{level.title}</h2>
                <p className={style.cardDescription}>{level.description}</p>
                <div className={style.cardActions}>
                </div>
              </div>
            ))
        ) : (
          <p>No hay niveles disponibles</p>
        )}
      </div>

      {levelSelect ? (
        <Exam idLevel={levelSelect.id} />
      ) : null}
    </div>
  );
};

export default Levels;
