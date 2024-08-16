import { lazy } from "react";
import { Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PublicRoutes } from "../../routes/routes";

const Landing = lazy(() => import("./Landing/Landing"));
const Login = lazy(() => import("./Login/Login"));
function Public() {
  return (
    <RoutesWithNotFound>
      <Route path={`${PublicRoutes.LOGIN}`} element={<Login />} />
      <Route path={`${PublicRoutes.LANDING}`} element={<Landing />} />
    </RoutesWithNotFound>
  );
}
export default Public;
