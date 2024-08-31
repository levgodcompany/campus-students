import { useEffect, useState } from "react";
import style from "./Courses.module.css";
import ViewStudent from "./components/ViewStudent/ViewStudent";
import MessageError from "../../../components/ConfirCancelReservation/MessageError";
import { useParams } from "react-router-dom";
import Navigation from "../../../components/Navigation/Navigation";
import { useDispatch } from "react-redux";
import { updatePageAll } from "../../../redux/slices/Navigations.slice";
import HeaderCampus from "../../../components/HeaderCampus/HeaderCampus";

const Courses = () => {
  const [error, setError] = useState<string | null>(null);
  const { idUnit, titleUnit } = useParams<{
    idUnit: string;
    titleUnit: string;
  }>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updatePageAll({
        page: {},
        title: `Cursos`,
        completTitle: "",
      })
    );

  }, []);

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
      <div className={style.container_view}>
        <ViewStudent idUnit={Number(idUnit)} />
      </div>
    </div>
    </>
  );
};

export default Courses;
