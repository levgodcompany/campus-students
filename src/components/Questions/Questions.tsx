import { useState } from "react";
import style from "./Questions.module.css";
import flecha from "../../assets/Flecha.svg";

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqList = [
    {
      question: "¿Qué niveles de inglés ofrecen?",
      answer:
        "Ofrecemos cursos desde el nivel básico (A1) hasta el avanzado (C2), siguiendo el Marco Común Europeo de Referencia para las Lenguas (MCER).",
    },
    {
      question:
        "¿Puedo obtener una devolución si no puedo continuar con el curso?",
      answer:
        "Ofrecemos reembolsos parciales bajo ciertas condiciones. Consulta nuestra política de reembolsos para más detalles.",
    },
    {
      question: "¿Qué material de estudio necesito?",
      answer:
        "Proporcionamos todo el material de estudio necesario, incluyendo libros, ejercicios interactivos y acceso a nuestra plataforma online de aprendizaje.",
    },

    {
      question: "¿Quiénes son los profesores?",
      answer:
        "Nuestros instructores son profesionales certificados con amplia experiencia en la enseñanza del inglés a nivel internacional. Algunos de ellos son hablantes nativos, mientras que otros han vivido y trabajado en países de habla inglesa.",
    },

    {
      question: "¿Entregan certificados al finalizar los cursos?",
      answer:
        "Sí, al completar un curso, recibirás un certificado que acredita tu nivel de inglés, el cual es reconocido internacionalmente.",
    },

    {
      question: "¿Cómo puedo pagar el curso?",
      answer:
        "Aceptamos varias formas de pago, incluyendo tarjetas de crédito, débito, transferencias bancarias y pagos en efectivo en nuestras oficinas.",
    },

    {
      question: "¿Qué sucede si falto a una clase?",
      answer:
        "Si faltas a una clase, puedes acceder al material de la clase a través de nuestra plataforma online y, en algunos casos, recuperar la clase con una sesión adicional.",
    },
  ];

  return (
    <div className={style.questionsContainer}>
      <h2 className={style.faqTitle}>Preguntas Frecuentes</h2>
      <div className={style.faqList}>
        {faqList.map((faq, index) => (
          <div key={index} className={style.faqItem}>
            <div
              className={style.question}
              onClick={() => toggleQuestion(index)}
            >
              <div className={style.containerQuestion}>
                <img className={activeIndex === index ? '' : style.questionImg} src={flecha} alt="" />
                <p>{faq.question}</p>
              </div>
            {activeIndex === index && (
              <div className={style.answer}>{faq.answer}</div>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
