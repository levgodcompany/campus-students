import { lazy } from "react";
import { Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PublicRoutes } from "../../routes/routes";

const Landing = lazy(() => import("./Landing/Landing"));
const Login = lazy(() => import("./Login/Login"));
const Level = lazy(() => import("./Level/Level"));

function Public() {
  return (
    <RoutesWithNotFound>
      <Route path={PublicRoutes.LOGIN} element={<Login />} />
      <Route path={PublicRoutes.LANDING}>
      <Route index element={<Landing />} />
        <Route path={`${PublicRoutes.LEVEL}/:idLevel`} element={<Level />} />
      </Route>
    </RoutesWithNotFound>
  );
}

export default Public;
