import React, { useEffect, useRef, useState } from "react";
import { ClassOnLiveDto } from "../../types/ClassOnlive";
import style from "./ClassSelect.module.css"; // Importamos los estilos
import Player from "@vimeo/player";

interface ClassSelectProps {
  classS: ClassOnLiveDto;
  close: () => void;
}

const ClassSelect: React.FC<ClassSelectProps> = ({ classS, close }) => {
  const [cl, setClass] = useState<ClassOnLiveDto>(classS);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (classS.url.length > 0) {
      const srcMatch = classS.url.match(/src="([^"]*)"/);
      if (srcMatch && srcMatch[1]) {
        setSrc(srcMatch[1]);
      }
    } else {
      setSrc(null);
    }
    setClass(classS);
  }, [classS]);

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
  }, [src]);

  const complet = async () => {
    // const isBool = studentAndModule.find((s) => s.moduleId == id);
    // if (!isBool) {
    //   ModulesServices.completStudent(Number(studentState?.id), idCourse, id);
    //   load(true);
    // }
  };

  return (
    <div className={style.container}>
      <div className={style.containerButton}>
        <button onClick={close}>X</button>
      </div>
      {src ? (
        <div className={style.video_container}>
          <div className={style.container_video}>
            <iframe
              ref={iframeRef}
              src={src}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
            ></iframe>
          </div>
          <div className={style.video_title}>
            <p className={style.title}>{cl.title}</p>
          </div>
          <div className={style.video_info}>
            <div dangerouslySetInnerHTML={{ __html: cl.description || "" }} />
          </div>
        </div>
      ) : (
        <div className={style.not_video_container}>
          {cl && cl.description && cl.description.length > 0 ? (
            <>
              <div className={style.video_title}>
                <p className={style.title}>{cl.title}</p>
              </div>
              <div className={style.video_info}>
                <div
                  dangerouslySetInnerHTML={{ __html: cl.description || "" }}
                />
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

export default ClassSelect;
