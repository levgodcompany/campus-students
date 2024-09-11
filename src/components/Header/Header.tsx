import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { PublicRoutes } from "../../routes/routes";
import logo from "../../assets/INHOUSE.svg"

interface HeaderProps {
  items: string[];
}
const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickNav = (nav: string) => {
    navigate(`/${PublicRoutes.PUBLIC}/${nav}`);
    setIsMenuOpen(false); // Cierra el menú después de navegar
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header para computadoras */}
      <header className={styles.headerDesktop}>
        <div className={styles.logo} onClick={() => onClickNav(PublicRoutes.LANDING)}>
        <img src={logo} alt="inhouse" />
        </div>
        <nav className={styles.navDesktop}>
          <ul>
            <li onClick={() => onClickNav(PublicRoutes.LANDING)}>Home</li>
            <li onClick={() => onClickNav(PublicRoutes.LANDING)}>Niveles</li>
            <li onClick={() => onClickNav(PublicRoutes.LANDING)}>Referentes</li>
            <li onClick={() => onClickNav(PublicRoutes.LANDING)}>Certificados</li>
          </ul>
        </nav>
        <div className={styles.actionsDesktop}>
          <span className={styles.actionsDesktopContact} onClick={() => onClickNav(PublicRoutes.CONTACT)}>Contacto</span>
          <span className={styles.actionsDesktopCampus} onClick={() => onClickNav(PublicRoutes.LOGIN)}>Campus</span>
        </div>
      </header>

      {/* Header para móviles */}
      <header className={styles.headerMobile}>
        <div className={styles.contHeaderMobil}>
          <div className={styles.logo} onClick={() => onClickNav(PublicRoutes.LANDING)}>
            <img src={logo} alt="inhouse" />
          </div>
          <button className={styles.menuButton} onClick={toggleMenu}>
            &#9776;
          </button>

        </div>
        {isMenuOpen && (
          <nav className={styles.navMobile}>
            <ul>
              <li onClick={() => onClickNav(PublicRoutes.LANDING)}>Ingles</li>
              <li onClick={() => onClickNav(PublicRoutes.LEVEL)}>Contacto</li>
              <li onClick={() => onClickNav(PublicRoutes.LOGIN)}>Campus</li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
