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

interface ViewStudentProps {
  idUnit: number;
}

const ViewStudent: React.FC<ViewStudentProps> = ({ idUnit }) => {
  const [coursesAndModules, setCoursesAndModules] = useState<
    CourseAndModules[]
  >([]);
  const navigate = useNavigate();
  const studetState = useAppSelector((state) => state.student);
  const [moduleSelect, setModuleSelet] = useState<{
    url: string;
    title: string;
    description: string;
  }>({
    title: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    fechCoursesAndModules();
  }, []);

  const fechCoursesAndModules = async () => {
    try {
      const app = CoursesService.crud();
      app.setUrl(`/unit/${idUnit}/student/${studetState?.id}`);
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

  return (
    <div className={style.container}>
      <div className={style.container_video}>
        <ViewVideo
          title={moduleSelect.title}
          url={moduleSelect.url}
          description={moduleSelect.description}
        />
      </div>
      <div className={style.list_video}>
        {coursesAndModules.length ? (
          coursesAndModules.map((c) => (
            <CourseList key={c.id} setModuleSelet={setModuleSelet} course={c} />
          ))
        ) : (
          <p>No hay cursos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ViewStudent;
