import React, { useEffect, useState } from "react";
import CoursesService from "../../services/Courses.service";
import CourseList from "./CourseList/CourseList";
import ViewVideo from "./ViewVideo/ViewVideo";
import style from "./ViewStudent.module.css";
import { CourseAndModules } from "../../../types/Courses.types";
import { useAppSelector } from "../../../../../redux/hooks";
import { axiosError } from "../../../../../utilities/https.utility";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../../../routes/routes";
import ModuleService from "../../services/Module.service";
import { StudentAndModule } from "./types/student.type";

interface ViewStudentProps {
  idUnit: number;
  idCohort: number
}

const ViewStudent: React.FC<ViewStudentProps> = ({ idUnit, idCohort }) => {
  const [coursesAndModules, setCoursesAndModules] = useState<
    CourseAndModules[]
  >([]);
  const [studetnAndModule, setStudentAndModule] = useState<StudentAndModule[]>(
    []
  );
  const [isFechComplet, setIsFechComplet] = useState<boolean>(false);
  const navigate = useNavigate();
  const studetState = useAppSelector((state) => state.student);
  const [moduleSelect, setModuleSelet] = useState<{
    id: number;
    url: string;
    title: string;
    description: string;
    idCourse: number;
  }>({
    id: 0,
    title: "",
    url: "",
    description: "",
    idCourse: 0,
  });

  useEffect(() => {
    fechCoursesAndModules();
    fechStudentToModules();
  }, []);

  useEffect(() => {
    loader();
  }, [isFechComplet]);

  const fechCoursesAndModules = async () => {
    try {
      const app = CoursesService.crud();
      app.setUrl(`/unit/${idUnit}/cohort/${idCohort}/student/${studetState?.id}`);
      const res = await app.findAll<CourseAndModules[]>();
      res.sort((a, b) => a.order - b.order);
      setCoursesAndModules(res);
    } catch (error) {
      const e = axiosError(error);
      if (e.statusCode == 403) {
        navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`, {
          replace: true,
        });
      }
    }
  };

  const fechStudentToModules = async () => {
    try {
      const app = ModuleService.crud();
      app.setUrl(`/assig/student/${studetState?.id}`);
      const res = await app.findAll<StudentAndModule[]>();
      setStudentAndModule(res);
    } catch (error) {
      const e = axiosError(error);
      if (e.statusCode == 403) {
        navigate(`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`, {
          replace: true,
        });
      }
    }
  };

  const loader = async () => {
    if (isFechComplet) {
      fechCoursesAndModules();
      fechStudentToModules();
    }
    setIsFechComplet(false);
    setModuleSelet({
      id: 0,
      title: "",
      url: "",
      description: "",
      idCourse: 0,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.container_video}>
        <ViewVideo
          id={moduleSelect.id}
          title={moduleSelect.title}
          url={moduleSelect.url}
          description={moduleSelect.description}
          studentAndModule={studetnAndModule}
          idCourse={moduleSelect.idCourse}
          load={setIsFechComplet}
        />
      </div>
      <div className={style.list_video}>
        {coursesAndModules.length ? (
          coursesAndModules.map((c) => (
            <CourseList
              key={c.id}
              studentAndModule={studetnAndModule}
              setModuleSelet={setModuleSelet}
              course={c}
            />
          ))
        ) : (
          <p>No hay cursos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ViewStudent;
