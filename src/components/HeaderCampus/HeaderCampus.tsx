import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeaderCampus.module.css";
import { PublicRoutes } from "../../routes/routes";
import logo from "../../assets/INHOUSE.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearNavigation } from "../../redux/slices/Navigations.slice";
import { logout } from "../../redux/slices/auth.slice";
import { logoutStudent } from "../../redux/slices/student.slice";

const HeaderCampus = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const studetnState = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();

  const onClickNav = (nav: string) => {
    navigate(`/${PublicRoutes.PUBLIC}/${nav}`);
    setIsMenuOpen(false); // Cierra el menú después de navegar
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeSecion = () => {
    dispatch(clearNavigation());
    dispatch(logoutStudent());
    dispatch(logout());
    navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`);
    setIsMenuOpen(false); // Cierra el menú después de navegar
  };

  return (
    <>
      {/* Header para computadoras */}
      <header className={styles.headerDesktop}>
        <div
          className={styles.logo}
          onClick={() => onClickNav(PublicRoutes.LANDING)}
        >
          <img src={logo} alt="inhouse" />
        </div>
        <nav className={styles.navDesktop}>
          <ul>
            {/* <li onClick={() => onClickNav(PublicRoutes.LANDING)}>Ingles</li> */}
          </ul>
        </nav>
        <div className={styles.actionsDesktop}>
          <div className={styles.dropdown}>
            <span onClick={toggleDropdown} className={styles.dropdownToggle}>
              {studetnState?.fullName}
            </span>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <span className={styles.perfil}> Perfil</span>
                </li>
                <li onClick={() => closeSecion()}>Cerrar sesión</li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Header para móviles */}
      <header className={styles.headerMobile}>
        <div className={styles.contHeaderMobil}>
          <div
            className={styles.logo}
            onClick={() => onClickNav(PublicRoutes.LANDING)}
          >
            <img src={logo} alt="inhouse" />
          </div>
          <button className={styles.menuButton} onClick={toggleMenu}>
            &#9776;
          </button>
        </div>
        {isMenuOpen && (
          <nav className={styles.navMobile}>
            <ul>
              <li onClick={toggleDropdown}>{studetnState?.fullName}</li>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenuMobile}>
                  <li>Perfil</li>
                  <li onClick={() => closeSecion()}>Cerrar sesión</li>
                </ul>
              )}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default HeaderCampus;
