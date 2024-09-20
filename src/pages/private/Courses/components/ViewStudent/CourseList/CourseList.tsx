import styles from "./CourseList.module.css";
import { CourseAndModules } from "../../../../types/Courses.types";
import { Module } from "../../../../types/Modules.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6 } from "@fortawesome/free-solid-svg-icons/faDiceD6";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons/faDiceD20";
import { faCircleNodes } from "@fortawesome/free-solid-svg-icons/faCircleNodes";
import { StudentAndModule } from "../types/student.type";
import { useEffect, useState } from "react";

type CourseListProps = {
  course: CourseAndModules;
  studentAndModule: StudentAndModule[];
  setModuleSelet: (moduleSelect: {
    id: number;
    url: string;
    typeFile: string;
    title: string;
    description: string;
    idCourse: number;
  }) => void;
};

const CourseList: React.FC<CourseListProps> = ({
  studentAndModule,
  course,
  setModuleSelet,
}) => {
  const sortedModules = course.modules.sort((a, b) => a.order - b.order);
  const [isCompletCourse, setIsCompletCourse] = useState<boolean>(false)
  
  useEffect(()=> {
    let total = 0;
    course.modules.map(module => {
      const isBool = studentAndModule.find((s) => s.moduleId == module.id);
      if(isBool) {
        total++;
      }
    });

    if(total == course.modules.length) {
      setIsCompletCourse(true);
    }

  }, [course])

  const handleSelect = (module: Module, idCourse: number) => {
    if(module.enabled && course.enabled){
      if (module.typeFile && module.fileURL) {
        switch (module.typeFile) {
          case "pdf":
            // Lógica para manejar archivos PDF
            setModuleSelet({
              idCourse: idCourse,
              id: module.id,
              title: module.title,
              typeFile: "pdf",
              url: module.fileURL,
              description: module.description,
            });
            // Aquí podrías establecer un estado o realizar otra acción específica para PDFs
            break;
  
          case "video":
            // Lógica para manejar archivos de video
            setModuleSelet({
              idCourse: idCourse,
              id: module.id,
              title: module.title,
              url: module.fileURL,
              typeFile: "video",
              description: module.description,
            });
            // Aquí podrías establecer un estado o realizar otra acción específica para videos
            break;
  
          case "link":
            // Lógica para manejar enlaces
            console.log("Handling link");
            // Aquí podrías establecer un estado o realizar otra acción específica para enlaces
            break;
          case "":
            // Lógica para manejar archivos de video
            setModuleSelet({
              idCourse: idCourse,
              id: module.id,
              title: module.title,
              url: "",
              typeFile: "pdf",
              description: module.description,
            });
            // Aquí podrías establecer un estado o realizar otra acción específica para videos
            break;
  
          default:
            console.log("Unknown file type");
            // Manejo para tipos de archivo desconocidos
            break;
        }
      } else {
        setModuleSelet({
          idCourse: idCourse,
          id: module.id,
          title: module.title,
          url: "",
          typeFile: "",
          description: module.description,
        });
      }

    }
  };

  const isComplet = (module: Module, idCourse: number) => {


    const isBool = studentAndModule.find((s) => s.moduleId == module.id);
  
    const isClass = ()=> {
      if(module.enabled && course.enabled) {
        return isBool ? `${styles.moduleItem} ${styles.moduleItemComplet}` : styles.moduleItem
      }else {
        return `${styles.moduleItem} ${styles.moduleItemInactive}`
      }
    }

    return (
      <>
      <li
        onClick={() => handleSelect(module, idCourse)}
        key={module.id}
        className={isClass()}
      >
        <div className={styles.moduleInfo}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={module.fileURL ? faDiceD6 : faCircleNodes} />
          </span>
          <p className={styles.title}>{module.title}</p>
        </div>
      </li>
      </>
    );
  };

  return (
    <div className={course.enabled ? styles.container : `${styles.container} ${styles.containerInactive}`}>
      <div className={styles.container_title}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faDiceD20} />
        </span>
        <span className={isCompletCourse ? `${styles.courseTitle} ${styles.containerCompletCourse}` : styles.courseTitle}>{course.title}</span>
      </div>
      <ul className={styles.moduleList}>
        {sortedModules
          .sort((a, b) => a.order - b.order)
          .map((module) => isComplet(module, module.idCourse))}
      </ul>
    </div>
  );
};

export default CourseList;
