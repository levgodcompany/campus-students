import { useEffect, useState } from "react";
import style from "./ViewVideo.module.css";

interface ViewVideoProps {
  url: string;
  title: string;
  description: string;
}

const ViewVideo: React.FC<ViewVideoProps> = ({ url, title, description }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [cleanDescription, setCleanDescription] = useState<string>(description);

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

  return (
    <div className={style.container}>
      {src ? (
        <div className={style.video_container}>
          <div className={style.container_video}>
            <iframe
              src={src}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
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
          <div className={style.video_title}>
            <p className={style.title}>{title}</p>
          </div>
          <div className={style.video_info}>
            <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewVideo;
