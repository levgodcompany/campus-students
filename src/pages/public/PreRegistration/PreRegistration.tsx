import { FormEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./PreRegistration.module.css";
import { StudentPre, TutorPre } from "./types/PreRegistration.types";
import Header from "../../../components/Header/Header";
import PreRegistrationService from "./service/PreRegistration.service";

const PreRegistration = () => {
  const { idLevel, leveltitle, idCohort } = useParams<{
    idLevel: string;
    leveltitle: string;
    idCohort: string;
  }>();

  const [formDataStudent, setFormDataStudent] = useState<StudentPre>({
    name: "",
    lastName: "",
    email: "",
    dni: "",
    birthDate: "",
    tel: "",
  });

  const [formDataTutor, setFormDataTutor] = useState<TutorPre>({
    name: "",
    lastName: "",
    email: "",
    tel: "",
    dni: "",
    relationship: "",
  });

  const [isUnderage, setIsUnderage] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (formDataStudent.birthDate) {
      const birthDate = new Date(formDataStudent.birthDate);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      setIsUnderage(age < 18);
    }
  }, [formDataStudent.birthDate]);

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataStudent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTutorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormDataTutor((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!isUnderage) {
        await PreRegistrationService.preRegistration(
          formDataStudent,
          Number(idLevel),
          Number(idCohort)
        );
      }
      console.log({ student: formDataStudent, tutor: formDataTutor });
    } catch (err) {
      console.error("Error submitting the form", err);
    }
  };

  const viewFormTutor = () => {
    return (
      <div className={styles.tutorSection}>
        <h3 className={styles.tutorSectionTitle}>Datos del Tutor</h3>
        <div className={styles.formAllGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="tutorName" className={styles.label}>
              Nombre *
            </label>
            <input
              type="text"
              id="tutorName"
              name="name"
              className={styles.input}
              placeholder="Nombre del tutor"
              value={formDataTutor.name}
              onChange={handleTutorChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tutorLastName" className={styles.label}>
              Apellido *
            </label>
            <input
              type="text"
              id="tutorLastName"
              name="lastName"
              className={styles.input}
              placeholder="Apellido del tutor"
              value={formDataTutor.lastName}
              onChange={handleTutorChange}
              required
            />
          </div>
        </div>

        <div className={styles.formAllGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="tutorDni" className={styles.label}>
              D.N.I *
            </label>
            <input
              type="text"
              id="tutorDni"
              name="dni"
              className={styles.input}
              placeholder="DNI del tutor"
              value={formDataTutor.dni}
              onChange={handleTutorChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tutorRelationship" className={styles.label}>
              Relación *
            </label>
            <select
              id="tutorRelationship"
              name="relationship"
              className={styles.select}
              value={formDataTutor.relationship}
              onChange={handleTutorChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="Padre">Padre</option>
              <option value="Madre">Madre</option>
              <option value="Hermano/a">Hermano/a</option>
              <option value="Tío/a">Tío/a</option>
              <option value="Abuelo/a">Abuelo/a</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        <div className={styles.formAllGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="tutorTel" className={styles.label}>
              Teléfono
            </label>
            <input
              type="tel"
              id="tutorTel"
              name="tel"
              className={styles.input}
              placeholder="Teléfono del tutor"
              value={formDataTutor.tel}
              onChange={handleTutorChange}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tutorEmail" className={styles.label}>
            Correo Electrónico *
          </label>
          <input
            type="email"
            id="tutorEmail"
            name="email"
            className={styles.input}
            placeholder="Correo electrónico del tutor"
            value={formDataTutor.email}
            onChange={handleTutorChange}
            required
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* <span>Pre inscripción a {leveltitle}</span> */}
        <div className={styles.containerForm}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Formulario de Estudiante */}
            <div className={styles.formHeader}>
              <h3 className={styles.title}>Pre-Inscripción {leveltitle}</h3>
              <p>Datos del Alumno/a</p>
            </div>
            <div className={styles.formAllGroup}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="Ingresa tu nombre"
                  value={formDataStudent.name}
                  onChange={handleStudentChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Apellido *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={styles.input}
                  placeholder="Ingresa tu apellido"
                  value={formDataStudent.lastName}
                  onChange={handleStudentChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formAllGroup}>
              
              <div className={styles.formGroup}>
                <label htmlFor="dni" className={styles.label}>
                  D.N.I *
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  className={styles.input}
                  placeholder="Ingresa tu DNI"
                  value={formDataStudent.dni}
                  onChange={handleStudentChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="birthDate" className={styles.label}>
                  Fecha De Nacimiento *
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className={styles.input}
                  value={formDataStudent.birthDate}
                  onChange={handleStudentChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formAllGroup}>
              <div className={styles.formGroup}>
                <label htmlFor="tel" className={styles.label}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  className={styles.input}
                  placeholder="Ingresa tu teléfono"
                  value={formDataStudent.tel}
                  onChange={handleStudentChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                placeholder="Ingresa tu correo electrónico"
                value={formDataStudent.email}
                onChange={handleStudentChange}
                required
              />
            </div>

            {/* Formulario de Tutor, visible si el estudiante es menor de 18 años */}
            {isUnderage && viewFormTutor()}

            <button type="submit" className={styles.submitButton}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PreRegistration;
