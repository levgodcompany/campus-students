import { useEffect, useRef, useState } from "react";
import style from "./ViewVideo.module.css";
import { useAppSelector } from "../../../../../../redux/hooks";
import ModulesServices from "../../../services/Module.service";
import Player from "@vimeo/player";
import { StudentAndModule } from "../types/student.type";

interface ViewVideoProps {
  id: number;
  url: string;
  title: string;
  description: string;
  studentAndModule: StudentAndModule[];
  idCourse: number;
  load: (isLoad: boolean)=> void
}

const ViewVideo: React.FC<ViewVideoProps> = ({
  id,
  url,
  title,
  description,
  studentAndModule,
  idCourse,
  load
}) => {
  const [src, setSrc] = useState<string | null>(null);
  const [cleanDescription, setCleanDescription] = useState<string>(description);
  const studentState = useAppSelector((state) => state.student);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (url.length > 0) {
      const srcMatch = url.match(/src="([^"]*)"/);
      if (srcMatch && srcMatch[1]) {
        setSrc(srcMatch[1]);
      }
    } else {
      setSrc(null);
    }
  }, [url]);

  useEffect(() => {
    const cleanedHtml = description.replace(/<p>\s*<br>\s*<\/p>/gi, "");
    setCleanDescription(cleanedHtml);
  }, [description]);

  useEffect(() => {
    if (iframeRef.current && src) {
      const player = new Player(iframeRef.current);

      // Escucha el evento 'ended'
      player.on("ended", () => {
        complet();
      });

      return () => {
        player.off("ended");
      };
    }
  }, [src]); // Asegúrate de que se ejecute cuando src esté disponible

  const complet = async () => {
    const isBool = studentAndModule.find((s) => s.moduleId == id);
    if (!isBool) {
      ModulesServices.completStudent(Number(studentState?.id), idCourse, id);
      load(true);
    }
  };

  return (
    <div className={style.container}>
      {src ? (
        <div className={style.video_container}>
          <div className={style.container_video}>
            <iframe
              ref={iframeRef}
              src={src}
              onLoad={() => console.log("Iframe cargado")} // Verifica que el iframe se ha cargado
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
            ></iframe>
          </div>
          <div className={style.video_title}>
            <p className={style.title}>{title}</p>
          </div>
          <div className={style.video_info}>
            <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
          </div>
        </div>
      ) : (
        <div className={style.not_video_container}>
          {description.length > 0 ? (
            <>
              <div className={style.video_title}>
                <p className={style.title}>{title}</p>
              </div>
              <div className={style.video_info}>
                <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
                <div className={style.containerButton}>
                  <button onClick={complet} className={style.buttonComplet}>
                    Marcar como completado
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewVideo;
