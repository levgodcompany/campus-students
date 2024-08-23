import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { PublicRoutes } from "../../routes/routes";
import logo from "../../assets/In English.svg"

const Header = () => {
  const navigate = useNavigate();

  const onClickNav = (nav: string)=> {
    navigate(`/${PublicRoutes.PUBLIC}/${nav}`);
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => onClickNav(PublicRoutes.LANDING)}>
        <span>INHOUSE</span>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li onClick={() => onClickNav(PublicRoutes.LANDING)}>Ingles</li>
        </ul>
      </nav>
      <div className={styles.actions}>
        <span onClick={() => onClickNav(PublicRoutes.LEVEL)}>Contacto</span>
        <span onClick={() => onClickNav(PublicRoutes.LOGIN)}>Campus</span>
      </div>
    </header>
  );
};

export default Header;
