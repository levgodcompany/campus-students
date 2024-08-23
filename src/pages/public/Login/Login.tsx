import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { login } from "./types/login.types";
import styles from "./Login.module.css";
import LoginService from "./services/Login.service";
import { loginSuccess, logout } from "../../../redux/slices/auth.slice";
import { PrivateRoutes } from "../../../routes/routes";
import Header from "../../../components/Header/Header";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

  useEffect(() => {
    dispatch(logout());
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
      if(isForgotPassword){
        alert(`Tu contraseña es ( asdñfj asdfñkj asdf s )`)
      }else {
        const res = await LoginService.login(formData);
        dispatch(loginSuccess({ token: res.token }));
        navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}`);

      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

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
        <button className={styles.buttonCancel} onClick={() => setIsForgotPassword(true)}>
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
        <button className={styles.buttonCancel} onClick={() => setIsForgotPassword(false)}>Cancelar</button>
      </form>
    );
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        {isForgotPassword ? viewIsForgotPassword() : viewLogin()}
      </div>
    </>
  );
};

export default Login;
