import React from "react";
import { LevelTeacher } from "../../types/Level.types";
import style from "./Teacher.module.css"; // Asegúrate de crear este archivo para los estilos

interface TeacherProps {
  teachers: LevelTeacher[];
}

const Teacher: React.FC<TeacherProps> = ({ teachers }) => {
  return (
    <div className={style.teacherContainer}>
       
      {teachers.map(({ teacher }) => (
        <div key={teacher.id} className={style.teacherCard}>
          <div className={style.imageContainer}>
            <img
              src={teacher.imgUrl || "https://via.placeholder.com/150"} // Imagen por defecto si no hay URL
              alt={`${teacher.name} ${teacher.lastName}`}
              className={style.teacherImage}
            />
          </div>
          <div className={style.teacherInfo}>
            <p className={style.teacherName}>{teacher.name} {teacher.lastName}</p>
            <p className={style.teacherLastName}>Profesor</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Teacher;
