import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.css";
import { PublicRoutes } from "../../routes/routes";
const Header = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/${PublicRoutes.LOGIN}`);
  };

  return (
    <div>
      <h2 onClick={onClick}>Login</h2>
    </div>
  );
};

export default Header;
