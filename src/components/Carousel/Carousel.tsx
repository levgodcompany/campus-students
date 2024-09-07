import React, { ReactNode, useState } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children: ReactNode[]; // Array de componentes hijos
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.prevButton} onClick={prevSlide}>
        &#10094;
      </button>

      <div className={styles.carouselContent}>
        {React.Children.map(children, (child, index) => (
          <div
            className={`${styles.carouselItem} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            {child}
          </div>
        ))}
      </div>

      <button className={styles.nextButton} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
