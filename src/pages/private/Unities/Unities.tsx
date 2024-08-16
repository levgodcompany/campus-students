import { useEffect, useState } from "react";
import UnitiesService from "./services/Unities.service";
import style from "./Unities.module.css";
import { Unit } from "./types/Unities.types";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "../../../routes/routes";
import { useDispatch } from "react-redux";
import {
  addPage,
  updatePage,
  updatePageAll,
} from "../../../redux/slices/Navigations.slice";
import Navigation from "../../../components/Navigation/Navigation";

const Unities = () => {
  const [unities, setUnities] = useState<Unit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { idLevel, titleLevel } = useParams<{
    idLevel: string;
    titleLevel: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUnities();
    dispatch(
      updatePageAll({
        page: {},
        title: `Unidades`,
        completTitle: "",
      })
    );
  }, [idLevel]);

  const fetchUnities = async () => {
    try {
      const app = UnitiesService.crud();
      app.setUrl(`/level/${idLevel}`);
      const res = await app.findAll();
      setUnities(res);
    } catch (error) {
      console.error("Error fetching units:", error);
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
    <div className={style.container}>
      <Navigation />
      {error && (
        <MessageError
          title="Error"
          message={error}
          cancel={() => setError(null)}
        />
      )}

      <h1 className={style.title}>Unidades del Nivel "{titleLevel}"</h1>
      
      <div className={style.cardContainer}>
        {unities.length > 0 ? (
          unities
            .sort((a, b) => a.order - b.order)
            .map((unit) => (
              <div key={unit.id} className={style.card}>
                <h2 className={style.cardTitle}>{unit.title}</h2>
                <p className={style.cardDescription}>{unit.description}</p>
                <div className={style.cardActions}>
                  <button
                    onClick={() => handleCardClick(unit)}
                    className={style.cardButton}
                  >
                    Cursos
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p>No hay unidades disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Unities;
