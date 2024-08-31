import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PrivateRoutes } from "../../routes/routes";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Levels = lazy(() => import("./Levels/Levels"));
const Unities = lazy(() => import("./Unities/Unities"));
const Courses = lazy(() => import("./Courses/Courses"));
const Cohorts = lazy(() => import("./Cohorts/Cohorts"));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route index element={<Navigate to={`${PrivateRoutes.DASHBOARD}`} />} />
      <Route path={`${PrivateRoutes.DASHBOARD}`} element={<Dashboard />} />
      <Route path={`${PrivateRoutes.LEVELS}`} element={<Levels />} />
      <Route path={`${PrivateRoutes.COHORTS}`} element={<Cohorts />} />
      <Route
        path={`${PrivateRoutes.UNITIES}/:idLevel/*`}
        element={<Unities />}
      />
      <Route
        path={`${PrivateRoutes.COURSES}/:idUnit/:titleUnit/*`}
        element={<Courses />}
      />
    </RoutesWithNotFound>
  );
}
export default Private;
