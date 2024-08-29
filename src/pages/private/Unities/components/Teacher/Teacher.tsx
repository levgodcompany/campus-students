import React from "react";
import style from "./Teacher.module.css"; // Asegúrate de crear este archivo para los estilos
import { TeacherDto } from "../../types/Unities.types";

interface TeacherProps {
  teachers: TeacherDto[];
}

const Teacher: React.FC<TeacherProps> = ({ teachers }) => {
  return (
    <div className={style.teacherContainer}>
      {teachers.map((teacher) => (
        <div key={teacher.id} className={style.teacherCard}>
          <div className={style.imageContainer}>
            <img
              src={teacher.imgUrl || "https://via.placeholder.com/150"} // Imagen por defecto si no hay URL
              alt={`${teacher.fullName}`}
              className={style.teacherImage}
            />
          </div>
          <div className={style.teacherInfo}>
            <p className={style.teacherName}>{teacher.fullName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Teacher;
