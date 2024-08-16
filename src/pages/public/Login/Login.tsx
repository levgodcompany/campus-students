import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { login } from "./types/login.types";
import styles from "./Login.module.css";
import LoginService from "./services/Login.service";
import { loginSuccess, logout } from "../../../redux/slices/auth.slice";
import { PrivateRoutes } from "../../../routes/routes";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<login>({
    email: "leandroveroninf@gmail.com",
    password: "LJVinformatica14",
  });
  const [error, setError] = useState<string | null>(null);

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
      const res = await LoginService.login(formData);
      dispatch(loginSuccess({ token: res.token }));
      // Dispatch login action here, e.g., dispatch(loginAction(formData))
      // Assuming loginAction is a thunk or action creator that handles the login process
      // const response = await dispatch(loginAction(formData));

      // For demonstration purposes, assuming a successful login:
      // if (response.success) {
      //   navigate('/dashboard'); // Redirect to dashboard or other page on success
      // }

      // Mock success for demonstration
      navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.LEVELS}`);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
