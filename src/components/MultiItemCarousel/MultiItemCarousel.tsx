import React, { useState, useRef } from "react";
import styles from "./MultiItemCarousel.module.css";

interface MultiItemCarouselProps {
  children: React.ReactNode[]; // Array de componentes hijos
  itemsToShow?: number; // Número de ítems a mostrar al mismo tiempo
}

const MultiItemCarousel: React.FC<MultiItemCarouselProps> = ({
  children,
  itemsToShow = 3, // Puedes ajustar el número de ítems visibles
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (containerRef.current) {
      const maxIndex = Math.max(
        0,
        Math.ceil(children.length - itemsToShow)
      );
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
      containerRef.current.style.transform = `translateX(-${
        (currentIndex + 1) * (100 / itemsToShow)
      }%)`;
    }
  };

  const prevSlide = () => {
    if (containerRef.current) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? Math.max(0, children.length - itemsToShow) : prevIndex - 1
      );
      containerRef.current.style.transform = `translateX(-${
        (currentIndex - 1) * (100 / itemsToShow)
      }%)`;
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.prevButton} onClick={prevSlide}>
        &#10094;
      </button>
      
      <div className={styles.carouselViewport}>
        <div
          ref={containerRef}
          className={styles.carouselContent}
          style={{ width: `${100 * children.length / itemsToShow}%` }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={styles.carouselItem}
              style={{ width: `${100 / itemsToShow}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      
      <button className={styles.nextButton} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default MultiItemCarousel;
