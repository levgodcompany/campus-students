import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { login } from "./types/login.types";
import styles from "./Login.module.css";
import LoginService from "./services/Login.service";
import { loginSuccess } from "../../../redux/slices/auth.slice";
import { PrivateRoutes, PublicRoutes } from "../../../routes/routes";
import { axiosError } from "../../../utilities/https.utility";
import { loginStudentSuccess } from "../../../redux/slices/student.slice";
import logoV1 from "../../../assets/INHOUSEV1.svg";
import flecha from "../../../assets/Flecha.svg";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [formData, setFormData] = useState<login>({
  //   email: "lean@gmail.com",
  //   password: "43028674",
  // });
  const [formData, setFormData] = useState<login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isForgotPassword) {
        alert(`Tu contraseña es ( asdñfj asdfñkj asdf s )`);
      } else {
        const res = await LoginService.login(formData);
        dispatch(loginSuccess({ token: res.token }));
        dispatch(
          loginStudentSuccess({
            id: res.user.id,
            fullName: res.user.fullName,
            email: res.user.email,
            levels: res.user.levels,
          })
        );
        navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}`);
      }
    } catch (err: any) {
      setError(`${axiosError(err).message}`);
    }
  };

  const redirectLanding = ()=> {
    navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LANDING}`);
  }

  const viewLogin = () => {
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Iniciar sesión
        </button>
        <button
          className={styles.buttonCancel}
          onClick={() => setIsForgotPassword(true)}
        >
          Olvidé mi contraseña
        </button>
      </form>
    );
  };

  const viewIsForgotPassword = () => {
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <h3 className={styles.formGroupTitle}>Restablecer contraseña</h3>
          <h2 className={styles.formGroupSubTitle}>
            Ingresa tu correo electrónico y te enviaremos un código para
            restablecerla.
          </h2>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete=""
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Enviar código
        </button>
        <button
          className={styles.buttonCancel}
          onClick={() => setIsForgotPassword(false)}
        >
          Cancelar
        </button>
      </form>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <div className={styles.containerHeader}>
            <div className={styles.containerHeaderFelcha}>
              <img onClick={redirectLanding} className={styles.imgFlecha} src={flecha} alt="" />
            </div>
            <img className={styles.imgLogo} src={logoV1} alt="" />
          </div>
          {isForgotPassword ? viewIsForgotPassword() : viewLogin()}
        </div>
      </div>
    </>
  );
};

export default Login;
