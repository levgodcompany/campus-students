import { useEffect, useState } from "react";
import style from "./NotFile.module.css";
import { useAppSelector } from "../../../../../../redux/hooks";
import ModulesServices from "../../../services/Module.service";
import { StudentAndModule } from "../types/student.type";

interface ViewVideoProps {
  id: number;
  title: string;
  description: string;
  studentAndModule: StudentAndModule[];
  idCourse: number;
  load: (isLoad: boolean) => void;
}

const NotFile: React.FC<ViewVideoProps> = ({
  id,
  title,
  description,
  studentAndModule,
  idCourse,
  load,
}) => {
  const [cleanDescription, setCleanDescription] = useState<string>(description);
  const studentState = useAppSelector((state) => state.student);
  useEffect(() => {
    const cleanedHtml = description.replace(/<p>\s*<br>\s*<\/p>/gi, "");
    setCleanDescription(cleanedHtml);
  }, [description]);

  const complet = async () => {
    const isBool = studentAndModule.find((s) => s.moduleId == id);
    if (!isBool) {
      ModulesServices.completStudent(Number(studentState?.id), idCourse, id);
      load(true);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.video_container}>
        <div className={style.video_title}>
          <p className={style.title}>{title}</p>
        </div>
        <div className={style.video_info}>
          <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
        </div>
      </div>
    </div>
  );
};

export default NotFile;
