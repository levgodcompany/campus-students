import styles from "./Contact.module.css";
import flecha from "../../../assets/Flecha.svg";
import logoV1 from "../../../assets/INHOUSEV1.svg";
import { PublicRoutes } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const redirectLanding = () => {
    navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LANDING}`);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <div className={styles.containerHeader}>
            <div className={styles.containerHeaderFelcha}>
              <img
                onClick={redirectLanding}
                className={styles.imgFlecha}
                src={flecha}
                alt=""
              />
            </div>
            <img className={styles.imgLogo} src={logoV1} alt="" />
          </div>
          <form  className={styles.form}>
          <div className={styles.formGroup}>
              <label htmlFor="text" className={styles.label}>
                Nombre y Apellido*
              </label>
              <input
                type="password"
                id="password"
                name="password"
                // value={formData.password}
                // onChange={handleChange}
                className={styles.input}
                placeholder="Nombre y Apellido"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="text" className={styles.label}>
                Telefono*
              </label>
              <input
                type="text"
                id="text"
                name="text"
                // value={formData.password}
                // onChange={handleChange}
                className={styles.input}
                placeholder="+54"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Correo electrónico*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                // value={formData.email}
                // onChange={handleChange}
                className={styles.input}
                placeholder="Ingresa tu correo electrónico"
                required
              />
            </div>
            
            <button type="submit" className={styles.button}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Contact;
