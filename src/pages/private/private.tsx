import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PrivateRoutes } from "../../routes/routes";

const Levels = lazy(() => import("./Levels/Levels"));
const Unities = lazy(() => import("./Unities/Unities"));
const Courses = lazy(() => import("./Courses/Courses"));
const ClassOnlive = lazy(() => import("./ClassOnlivel/ClassOnlive"));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route index element={<Navigate to={`${PrivateRoutes.LEVELS}`} />} />
      <Route path={`${PrivateRoutes.LEVELS}`} element={<Levels />} />
      <Route
        path={`${PrivateRoutes.CLASS_ON_LIVE}/:idCohort`}
        element={<ClassOnlive />}
      />
      <Route
        path={`${PrivateRoutes.UNITIES}/:idLevel/:idCohort`}
        element={<Unities />}
      />
      <Route
        path={`${PrivateRoutes.COURSES}/:idUnit/:idCohort/*`}
        element={<Courses />}
      />
    </RoutesWithNotFound>
  );
}
export default Private;
