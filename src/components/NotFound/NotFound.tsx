import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { PrivateRoutes, PublicRoutes } from "../../routes/routes";
import styles from "./NotFound.module.css";
const NotFound = () => {
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const redirect = () => {
    if (token) {
      navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}`);
    } else {
      navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LANDING}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <a onClick={redirect} className={styles.homeLink}>
        Volver al inicio
      </a>
    </div>
  );
};

export default NotFound;
